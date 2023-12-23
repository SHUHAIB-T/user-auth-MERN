import jwt from "jsonwebtoken";
import user from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.Jwt;
    if (token) {
        try {
            let encoded = await jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, invalid tocken")
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized, no tocken")
    }
})