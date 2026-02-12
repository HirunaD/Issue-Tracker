import { Router } from "express";
const router = Router();
import {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController.js";
import auth from "../middleware/auth.js";

router.get("/", auth, getIssues);
router.post("/", auth, createIssue);
router.patch("/:id", auth, updateIssue);
router.delete("/:id", auth, deleteIssue);

export default router;
