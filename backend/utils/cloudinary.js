import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        
        console.log("File uploaded to Cloudinary:", response.url);
        fs.unlinkSync(localFilePath); // Ensure the local file is removed
        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Ensure the local file is removed on error
        }
        return null;
    }
};
