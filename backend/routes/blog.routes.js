import express from "express";
import { BlogLike, createBlog, getBlogById, getBlogs } from "../controllers/blog.controller.js";
import protectRoute, { upload } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute,upload.fields([{ name:'coverImage', maxCount: 1 }]), createBlog);
router.get("/blogs", getBlogs);
router.get("/:id", getBlogById);
router.put("/blogs/:id/like", BlogLike);

export default router;
