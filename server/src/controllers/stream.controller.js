const httpStatus = require("http-status");
const { streamService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const addStream = catchAsync(async (req, res) => {
  const stream = await streamService.addStream(req.body,req.file);
  
  res
    .status(httpStatus.CREATED)
    .send({ message: `${stream} Stream added successfully` });
});

const getStreamById = catchAsync(async (req, res) => {
  const resp = await streamService.getStreamById(req.params.stream_id);
  res.status(httpStatus.OK).send(resp);
});

module.exports = { addStream, getStreamById };
