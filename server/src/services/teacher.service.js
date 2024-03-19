const httpStatus = require("http-status");
const { Teacher } = require("../models");
const ApiError = require("../utils/ApiError");
const { uploadFileToCloudinary } = require("./cloudinary.service");
const { deleteLocalFile } = require("./file.service");

const registerTeacher = async (userBody, file) => {
  try {
    if (await Teacher.isEmailTaken(userBody.email)) {

      throw new ApiError(httpStatus.BAD_REQUEST, "Teacher already exists with this email")
    }

    const result = await uploadFileToCloudinary(file, `/QuizEazy/Teacher/CollegeIdProof/${userBody.email}`)

    deleteLocalFile(file)

    userBody.publicId = result.public_id;
    userBody.collegeIdProof = result.secure_url;

    return Teacher.create(userBody)

  } catch (error) {
    throw error;
  }
};

module.exports = { registerTeacher };
