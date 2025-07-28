import express from "express";
import { protect } from "../middleware/auth.js";
import { changerRoleToOwner } from "../controllers/ownerController.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changerRoleToOwner);

export default ownerRouter;
