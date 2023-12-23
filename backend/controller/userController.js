import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import createToken from "../utils/generateToken.js"


// @desc     Auth user/set token
// route     POST /api/users/auth
// @access   Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
        createToken(res, user._id);
        res.status(500);
        res.json(user);
    } else {
        res.status(401);
        throw new Error("invalid email or password");
    }
});

// @desc     Register User 
// route     POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name, phone } = req.body;
    const isExist = await User.findOne({ email: email });
    if (!isExist) {
        let user = new User({
            name,
            email,
            phone,
            password
        });
        const saveUser = await user.save();
        createToken(res, saveUser._id);
        res.json(saveUser)
    } else {
        res.status(400);
        throw new Error("User Allready exist");
    }
});

// @desc     GET User profile
// route     GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    let user_id = req.query.id;
    const userDetails = await User.findOne({ _id: user_id });
    if (userDetails) {
        res.json(userDetails)
    } else {
        res.status(400);
        throw new Error("user not found");
    }
});

// @desc     Update User profile
// route     PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Update User"
    });
});

// @desc     Logut User
// route     POST /api/users/logout
// @access   Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({
        message: "User Logged out"
    });
});

export {
    authUser,
    registerUser,
    updateUserProfile,
    getUserProfile,
    logoutUser
}
