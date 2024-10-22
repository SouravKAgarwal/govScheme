import express from "express";
import {
  getSchemeCounts,
  getTotalSchemes,
  getUserAnalytics,
} from "../controllers/analyticsController.js";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getUserAnalytics);
router.get("/schemes", getTotalSchemes);
router.get("/schemes-count", getSchemeCounts);

export default router;
