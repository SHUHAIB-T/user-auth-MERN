import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import { generateAdmintoken } from "../utils/generateToken.js";

// @desc     Admin register 
// route     POST /api/admin/regiter 
// @access   public
const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const adminExist = await Admin.findOne({ email: email });

    if (!adminExist) {
        let admin = new Admin();
        admin.email = email;
        admin.password = password;
        let registeredAdmin = await admin.save();
        res.status(200).json(registeredAdmin);
    } else {
        throw new Error("Email Already Exist");
    }
});


// @desc     Admin Login with JWT
// route     POST /api/admin/login
// @access   protected
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (admin && admin.matchPassword(password)) {
        generateAdmintoken(res, admin._id);
        res.status(200);
        res.json(admin);
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

});

// @desc     Admin sign out
// route     POST /api/admin/logout
// @access   private
const adminLogout = asyncHandler(async (req, res) => {
    res.cookie('jwtadmin', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({
        message: "Admin Logged out"
    });
});

export {
    adminLogin,
    register,
    adminLogout
};