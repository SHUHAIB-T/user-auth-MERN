import express from "express";
const router = express.Router();

import { adminLogin, register, adminLogout } from "../controller/adminController.js";
import adminUserRoute from "./adminUserRoute.js"

router.post("/register", register);
router.post("/login", adminLogin);
router.get("/logout", adminLogout);
router.use("/manageuser", adminUserRoute);

export default router;