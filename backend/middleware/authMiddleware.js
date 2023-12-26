import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler";

// protect user routers
const protect = asyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwt;
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
});

// protect admin route
const isAdminLoggedIn = asyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwtadmin;
    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, invalid tocken")
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized, no tocken")
    }
});


export { protect, isAdminLoggedIn };