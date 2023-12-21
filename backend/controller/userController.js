import asyncHandler from "express-async-handler"

// @desc     Auth user/set token
// route     POST /api/users/auth
// @access   Public
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Auth user"
    });
});

// @desc     Register User 
// route     POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Register User"
    });
});

// @desc     GET User profile
// route     GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Get User Profile"
    });
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
    res.status(200).json({
        message: "Logout User"
    });
});

export {
    authUser,
    registerUser,
    updateUserProfile,
    getUserProfile,
    logoutUser
}
