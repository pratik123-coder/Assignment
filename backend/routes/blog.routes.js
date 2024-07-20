import express from "express";
import { createBlog, getBlogs } from "../controllers/blog.controller.js";
import protectRoute, { upload } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute,upload.fields([{ name:'coverImage', maxCount: 1 }]), createBlog);
router.get("/blogs", getBlogs);

export default router;
