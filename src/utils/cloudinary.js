import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dukumrk8b",
  api_key: "854838926691657",
  api_secret: "dYwNfu2gwnjcZ3l068TKrNepdws",
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
    return uploadresponse;
  } catch (error) {
    console.log(
      "cloudinary not able to upload the image some erro happened->",
      error
    );
  }
};

export default uploadimagecloud;
