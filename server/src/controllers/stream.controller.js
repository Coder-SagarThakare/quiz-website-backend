const httpStatus = require("http-status");
const { streamService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const addStream = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.NOT_FOUND, "Please upload an image.");
  }
  req.body.createdBy = req.user._id;

  const stream = await streamService.addStream(req.body, req.file);

  res
    .status(httpStatus.CREATED)
    .send({ message: `${stream} Stream added successfully` });
});

const getStreamById = catchAsync(async (req, res) => {
  const resp = await streamService.getStreamById(req.params.streamId);
  res.status(httpStatus.OK).send(resp);
});

const updateStreamById = catchAsync(async (req, res) => {
  const resp = await streamService.updateStreamById(
    req.params.streamId,
    req.body
  );
  res.status(httpStatus.OK).send({ message: "Stream updated successfully" });
});

const updateProfilePhoto = catchAsync(async (req, res) => {
  await streamService.updateStreamById(req.params.streamId, req.file);
  res.send(httpStatus.OK).send("in upload profile photo");
});

const deleteStreamById = catchAsync(async (req, res) => {
  await streamService.deleteStreamById(req.params.streamId);
  res.status(httpStatus.OK).send({ message: "Stream deleted Successfully" });
});

module.exports = {
  addStream,
  getStreamById,
  deleteStreamById,
  updateStreamById,
  updateProfilePhoto
};
