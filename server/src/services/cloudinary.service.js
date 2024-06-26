const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

// const uploadFileToCloudinary = async (file, folderName = "") => {

//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       folder: `QuizEasy/${folderName}`,
//     });

//     return result;
//   } catch (error) {
//     console.log(error);
//     throw new ApiError(
//       httpStatus.INTERNAL_SERVER_ERROR,
//       error.message
//     );
//   }
// };

const uploadFileToCloudinary = async   ({
  buffer,
  folderName = "",
  publicId = "",
}) => {
  console.log("buffer", buffer);

  const uploadOptions = {
    resource_type: "auto",
    folder: `QuizEasy/${folderName}`,
  };

  if (publicId) {
    uploadOptions.public_id = publicId;
  }
  // { resource_type: "auto", folder:`QuizEasy/${folderName}` }
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(uploadOptions, (error, result) => {
          if (error) {
            console.error("Upload Error:", error);
            reject(error);
          } else {
            console.log("Upload Result:", result);
            resolve(result);
          }
        })
        .end(buffer);
    });
    return result;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteFileFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    console.log("cloudinary result", result);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e.message);
  }
};

module.exports = { uploadFileToCloudinary, deleteFileFromCloudinary };
