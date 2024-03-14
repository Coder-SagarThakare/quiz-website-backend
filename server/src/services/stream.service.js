const httpStatus = require("http-status");
const { Stream } = require("../models");
const ApiError = require("../utils/ApiError");
const {
  uploadFileToCloudinary,
  deleteFileFromCloudinary,
} = require("./cloudinary.service");

const streamNotFoundErr = () => {
  throw new ApiError(httpStatus.NOT_FOUND, "Stream not found");
};

const addStream = async (body, file) => {
  const isStreamAdded = await Stream.findOne({ name: body.name });

  if (isStreamAdded)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `${body.name} Stream already exist`
    );

  const result = await uploadFileToCloudinary(
    file.path,
    "QuizEasy/stream_bgImages"
  );

  body.bgImage = result.secure_url;
  body.publicId = result.public_id;

  const stream = await Stream.create(body);
  return stream.name;
};

const getStreamById = async (streamId) => {
  const resp = await Stream.findOne({ _id: streamId });

  if (!resp) streamNotFoundErr();

  return resp;
};

const updateStreamById = async (streamId, updatedBody) => {
  const stream = await Stream.findOneAndUpdate(
    { _id: streamId },
    { ...updatedBody }
  );

  if (!stream) streamNotFoundErr();

  return stream;
};

const deleteStreamById = async (streamId) => {
  const stream = await Stream.findOne({ _id: streamId });

  if (!stream) streamNotFoundErr();

  console.log("stream", stream);

  await deleteFileFromCloudinary(stream.publicId);

  const resp = await Stream.deleteOne({ _id: streamId });

  if (resp.deletedCount < 1) streamNotFoundErr();

  return;
};

module.exports = {
  addStream,
  getStreamById,
  deleteStreamById,
  updateStreamById,
};
