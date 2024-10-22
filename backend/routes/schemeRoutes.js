import express from "express";
import { authorizeRoles, protect } from "../middlewares/authMiddleware.js";
import {
  createScheme,
  getSchemesByEligibility,
  getSchemes,
  updateScheme,
  getSingleScheme,
  deleteScheme,
  getTopPopularSchemes,
} from "../controllers/schemeController.js";

const router = express.Router();

router.post("/create", protect, authorizeRoles("admin"), createScheme);
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteScheme);
router.put("/update/:id", protect, authorizeRoles("admin"), updateScheme);
router.get("/all", getSchemes);
router.get("/eligibility", getSchemesByEligibility);
router.get("/top", getTopPopularSchemes);
router.get("/:slug", getSingleScheme);

export default router;
