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
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 9;
  const skip = (page - 1) * pageSize;
  
  try {
    const [blogs, total] = await Promise.all([
      db.blog.findMany({
        skip,
        take: pageSize,
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      }),
      db.blog.count(),
    ]);

    res.status(200).json({ blogs, total });
  } catch (error) {
    console.error("Error in retrieving blogs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await db.blog.findUnique({
      where: { id: id },
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
    const { id } = req.params; // blog ID is passed as a URL parameter

    // Find the blog by ID
    const blog = await db.blog.findUnique({ where: { id: id } });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Increment the like count
    const updatedBlog = await db.blog.update({
      where: { id: id },
      data: { likes: blog.likes + 1 },
    });

    res.status(200).json({ message: "Blog liked successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error in BlogLike Controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};