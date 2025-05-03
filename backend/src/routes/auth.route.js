import express from "express";
import { blockUser, checkAuth, deleteUser, login, logout, signup, unblockUser, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
router.post("/block", protectRoute, blockUser);
router.post("/unblock", protectRoute, unblockUser);

router.get("/check", protectRoute, checkAuth);
router.delete("/delete", protectRoute, deleteUser);

export default router;
