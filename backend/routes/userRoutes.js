import express from "express";
const router = express.Router();

import {
    authUser,
    registerUser,
    updateUserProfile,
    getUserProfile,
    logoutUser,
    updateProfile
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerConfige.js";


router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.post("/update-profile/:id", upload.single('profile'), updateProfile);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)


export default router;