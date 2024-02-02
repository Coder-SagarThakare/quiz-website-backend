const httpStatus = require("http-status");
const { subjectService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const addNewSubject = catchAsync(async (req, res) => {
  const response = await subjectService.addNewSubject(req.body);
  res.status(httpStatus.CREATED).send(response);
});

module.exports = { addNewSubject };
