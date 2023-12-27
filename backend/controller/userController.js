import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import createToken from "../utils/generateToken.js"



// @desc     Auth user/set token
// route     POST /api/users/auth
// @access   Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
        const token = createToken(res, user._id);
        res.status(200);
        res.json({ user: user, token: token });
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
        res.json({ success: true })
    } else {
        res.status(400);
        throw new Error("User Allready exist");
    }
});

// @desc     GET User profile
// route     GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    console.log(req.user);
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
    }
    res.json(user)
});

// @desc     Update User profile
// route     PUT /api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {

    let user = await User.findById(req.user._id);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    if (req.body.password) {
        user.password = req.body.password;
    }

    let updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone
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


// @desc     Logut User
// route     POST /api/users/update-profile
// @access   Private
const updateProfile = asyncHandler(async (req, res) => {
    if (!req.file) throw new Error("Internal Server Error");
    const user = await User.findById(req.params.id);
    user.profile = {
        filename: req.file.filename
    }
    user.save();
    res.json({
        message: 'Profile updated successfully',
        filename: req.file.filename
    })

});



export {
    authUser,
    registerUser,
    updateUserProfile,
    getUserProfile,
    logoutUser,
    updateProfile
}
