import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
    let token 
    token = req.cookies.jwt;
    console.log(token)
    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, invalid tocken")
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized, no tocken")
    }
})

export { protect };