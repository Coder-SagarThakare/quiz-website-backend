const httpStatus = require("http-status");
const { streamService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const addStream = catchAsync(async (req, res) => {
  const stream = await streamService.addStream(req.body);
  res.status(httpStatus.CREATED).send({ message: ` ${stream} Stream added successfully` });
});

module.exports = { addStream };
