import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc     Get all user details
// route     GET /api/admin/manageuser
// @access   Private
const getAllusers = asyncHandler(async (req, res) => {
    let query = { status: true }
    if (req.query.search) {
        query.name = { $regex: new RegExp(req.query.search, 'i') };
    }
    const users = await User.find(query);
    if (users) {
        res.status(200);
        res.json({ success: true, users: users });
    } else {
        res.status(500);
        throw new Error("Something went Wrong!");
    }
});

// @desc     Get One user
// route     POST /api/admin/manageuser/:id
// @access   Private
const getusers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200);
        res.json(user);
    } else {
        res.status(500);
        throw new Error("Something went Wrong!");
    }
});

// @desc     Get One user
// route     POST /api/admin/manageuser/
// @access   Private
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
        let user = new User({
            name,
            email,
            phone,
            password
        });
        const saveUser = await user.save();
        res.status(200).json({ success: true })
    } else {
        res.status(402);
        throw new Error("Email Already Exist");
    }
});

// @desc     Delete User 
// route     DELETE /api/admin/manageuser/:id
// @access   Private
const deleteUser = asyncHandler(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deleteUser) {
        res.status(200);
        res.json({
            message: "User deleted successfully",
            usesrId: req.params.id
        });
    } else {
        res.status(500);
        throw new Error("Iternal Server Error");
    }
});

// @desc     Update User 
// route     PUT /api/admin/manageuser/:id
// @access   Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
        user.password = req.body.password;
    }
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        res.status(401);
        throw new Error("Email is allready exist");
    } else {
        let updatedUser = await user.save();
        if (updatedUser) {
            res.status(200).json({ success: true, user: updatedUser });
        } else {
            res.status(500);
            throw new Error("Internal server Error");
        }
    }
});

export {
    getAllusers,
    getusers,
    registerUser,
    deleteUser,
    updateUser
};