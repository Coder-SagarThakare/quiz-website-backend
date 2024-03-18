const httpStatus = require("http-status");
const { teacherService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const registerTeacher = catchAsync(async (req, res) => {
  await teacherService.registerTeacher({ ...req.body });
  res.status(httpStatus.CREATED).send({message : "user registered sucessfully"});
});

module.exports = { registerTeacher };


