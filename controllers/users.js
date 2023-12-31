import User from "../models/userdb.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const home = (req, res) => {
    res.send("Api is Working");
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
           throw new Error("Incorrect email or password")
            // next(new ErrorHandler("Incorrect email or password", 404))
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect email or password")
            // return next(new ErrorHandler("Incorrect email or password", 404))
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
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            throw new Error("User already exists")
            // return next(new ErrorHandler("User already exists", 404))
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
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllUser = async (req, res) => {
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        users
    });
}

export const getMyProfile = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user
    });
}

export const logout = (req, res) => {
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

// export { home, login, register, getAllUser, getMyProfile, logout }