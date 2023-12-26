import express from "express";
const router = express.Router();
import { isAdminLoggedIn } from "../middleware/authMiddleware.js";

import {
    getAllusers,
    getusers,
    registerUser,
    deleteUser,
    updateUser,
} from "../controller/adminUserController.js"

router.get("/:id", isAdminLoggedIn, getusers);
router.route("/").get(isAdminLoggedIn, getAllusers).post(isAdminLoggedIn, registerUser);
router.route("/:id").delete(isAdminLoggedIn, deleteUser).put(isAdminLoggedIn, updateUser);

export default router;