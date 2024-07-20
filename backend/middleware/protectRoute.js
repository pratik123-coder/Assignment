import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';
import multer from 'multer';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized, no token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized, token is invalid" });
        }

        const user = await db.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            return res.status(401).json({ error: "Unauthorized, user not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Unauthorized, token is invalid" });
        }
        console.error("Error in Protect Route Middleware:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})

export default protectRoute;
