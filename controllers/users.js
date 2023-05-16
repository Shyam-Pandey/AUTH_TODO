import express from "express";
import User from "../models/userdb.js";

const home = (req, res) => {
    res.send("Api is Working");
}

const createUser = async function (req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    })
    res.json({
        success: true,
        messages: "Registered"
    });
}

const getAllUser = async (req, res) => {
    const users = await User.find({})

    res.json({
        success: true,
        users
    })
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success: true,
        user
    })
}





export {home,getAllUser,createUser,getUser}