const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "difupvzin",
  api_key: 481521776181986,
  api_secret: "UZHHf60EpS0xCdw3DQ2mDcPTNXQ",
});

const uploadFileToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file);
    
    return result;
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR ,'Error while uploading image')
  }
};

module.exports = { uploadFileToCloudinary };
