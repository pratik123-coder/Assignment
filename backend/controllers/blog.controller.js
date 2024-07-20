import {db} from '../db/index.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


export const createBlog = async (req, res) => {
  const { title, body } = req.body;

  let coverImageLocalPath;
  if (req.files && req.files.coverImage && req.files.coverImage[0]) {
      coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!coverImageLocalPath) {
    return res.status(400).json({ message: "Cover image file is required" });
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage) {
    return res.status(400).json({ message: "Failed to upload cover image" });
  }

  try {
    const blog = await db.blog.create({
      data: {
        title,
        body,
        image: coverImage?.url || "",
        authorId: req.user.id,
      },
    });
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Error in createBlog Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getBlogs = async (req, res) => {
  try {
    const blogs = await db.blog.findMany({
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error in retrieving blogs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await db.blog.findUnique({
      where: { id: blogId },
      include: {
        author: {
          select: {
            name: true,
          }
        }
      }
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error in getBlogById Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const BlogLike = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized, user not authenticated" });
    }
    const { blogId } = req.params; // blog ID is passed as a URL parameter

    // Find the blog by ID
    const blog = await db.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Increment the like count
    const updatedBlog = await db.blog.update({
      where: { id: blogId },
      data: { likes: blog.likes + 1 },
    });

    res.status(200).json({ message: "Blog liked successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error in BlogLike Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
