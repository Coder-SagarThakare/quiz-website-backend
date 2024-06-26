const httpStatus = require("http-status");
const { teacherService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const getAllTeachers = catchAsync(async (req, res) => {
  const result = await teacherService.getAllTeachers();
  res.status(httpStatus.OK).send(result);
});

const verifyTeacher = catchAsync(async (req, res) => {
  const result = await teacherService.verifyTeacher(req.params.teacherId);
  res.status(httpStatus.OK).send(result);
});

const getTeacher = catchAsync(async(req,res)=>{
  res.send(httpStatus.OK,req.user)
})
module.exports = {
    getAllTeachers,
  verifyTeacher,
  getTeacher

};
