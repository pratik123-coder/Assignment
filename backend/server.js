import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

// Route Imports
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

app.use(cors());

app.use(express.json());  // to parse the incoming requests from JSON payloads (from req.body)
app.use(cookieParser()); // middleware for cookie

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.use(express.static(path.join(__dirname, "/frontend2/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
