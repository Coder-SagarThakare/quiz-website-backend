const httpStatus = require("http-status");
const { Teacher } = require("../models");
const ApiError = require("../utils/ApiError");
const { uploadFileToCloudinary } = require("./cloudinary.service");
// const { deleteLocalFile } = require("./file.service");

const teacherNotFoundErr = () => {
  throw new ApiError(httpStatus.NOT_FOUND, "Teacher not found");
};
const registerTeacher = async (userBody, file) => {
  try {
    if (await Teacher.isEmailTaken(userBody.email)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Teacher already exists with this email"
      );
    }

    const result = await uploadFileToCloudinary(
      file.buffer,
      `Teacher/${userBody.email}/CollegeIdProof/`
    );

    // deleteLocalFile(file)

    userBody.publicId = result.public_id;
    userBody.collegeIdProof = result.secure_url;

    return Teacher.create(userBody);
  } catch (error) {
    throw error;
  }
};

const getTeacherByEmail = async (email) => {
  const teacher = Teacher.findOne({ email });

  if (!teacher) teacherNotFoundErr();

  return teacher;
};

const getAllTeachers = async () => {
  return await Teacher.find();
};

const verifyTeacher = async (teacherId) => {
  const teacher = Teacher.findOne({ _id: teacherId });
  console.log(teacher);
  if (!teacher) teacherNotFoundErr();

  return teacher;
};

module.exports = {
  registerTeacher,
  getAllTeachers,
  verifyTeacher,
  getTeacherByEmail,
};
