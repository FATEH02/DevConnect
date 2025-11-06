import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadimagecloud = async (filepath) => {
  try {
    console.log(filepath);
    if (!filepath) {
      console.log("please add some filespath ");
      return;
    }
    const uploadresponse = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filepath)
    return uploadresponse;
  } catch (error) {
    console.log(
      "cloudinary not able to upload the image some erro happened->",
      error
    );
  }
};

export default uploadimagecloud;
