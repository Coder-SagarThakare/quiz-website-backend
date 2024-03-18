const httpStatus = require("http-status");
const { Teacher } = require("../models");
const ApiError = require("../utils/ApiError");

const registerTeacher = async (userBody) => {
  try {
    if(await Teacher.isEmailTaken(userBody.email)){
      
      throw new ApiError(httpStatus.BAD_REQUEST,"Teacher already exists with this email")
    }

    return Teacher.create(userBody)
    
  } catch (error) {
    throw error;
  }
};

module.exports = { registerTeacher };
