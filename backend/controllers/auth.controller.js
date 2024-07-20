import { db } from "../db/index.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const user = await db.user.findUnique({ where: { email } });
  if (user) {
    return res.status(400).json({ error: "Username already exists" });
  }
  const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
  const ProfilePic = `https://avatar.iran.liara.run/public`;
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePic: ProfilePic,
      },
    });
    if (user) {
      // Generate JWT token and set cookie
      generateTokenAndSetCookie(user.id, res);

      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      });
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // Generate JWT token and set cookie
    generateTokenAndSetCookie(user.id, res);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    
  }
}