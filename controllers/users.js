import User from "../models/userdb.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const home = (req, res) => {
    res.send("Api is Working");
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Incorrect email or password", 404))
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler("Incorrect email or password", 404))
        }

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        return res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        }).json({
            success: true,
            message: `Welcome Back ${""} ${user.name}`
        })
    } catch (error) {
        next(error)
    }


}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return next(new ErrorHandler("User already exists", 404))
        }

        const hashPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hashPassword
        });

        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        return res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        }).json({
            success: true,
            message: "User created successfully"
        });

    } catch (error) {

    }
}

const getAllUser = async (req, res) => {
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        users
    });
}


const getMyProfile = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });
}

const logout = (req, res) => {
    res.status(200).
    cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,
        message: "Logout Successfully"
    });
}

export { home, login, register, getAllUser, getMyProfile, logout }