const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadFileToCloudinary = async (file, folderName = "quizEasy") => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folderName,
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error while uploading image"
    );
  }
};

module.exports = { uploadFileToCloudinary };
