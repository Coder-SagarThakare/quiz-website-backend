const httpStatus = require("http-status");
const { teacherService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const registerTeacher = catchAsync(async (req, res) => {
  console.log();
  await teacherService.registerTeacher({ ...req.body },req.file.path);
  res.status(httpStatus.CREATED).send({message : "Teacher registered sucessfully"});
});

module.exports = { registerTeacher };


