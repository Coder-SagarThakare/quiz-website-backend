const httpStatus = require("http-status");
const { teacherService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const registerTeacher = catchAsync(async (req, res) => {
  await teacherService.registerTeacher({ ...req.body }, req.file.path);
  res.status(httpStatus.CREATED).send({ message: "Teacher registered sucessfully" });
});

const getAllTeachers = catchAsync(async (req, res) => {

  const result = await teacherService.getAllTeachers()
  res.status(httpStatus.OK).send(result)

})

const verifyTeacher = catchAsync(async (req, res) => {

  const result = await teacherService.verifyTeacher(req.params.teacherId)
  res.status(httpStatus.OK).send(result)

})
module.exports = { registerTeacher, getAllTeachers, verifyTeacher };