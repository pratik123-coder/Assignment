import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({ 
  cloud_name: "dbzo04n4l", 
  api_key: 879898214142163, 
  api_secret: "epkpFyhlA0U1oQV-6HF6_uR3JoM"
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
