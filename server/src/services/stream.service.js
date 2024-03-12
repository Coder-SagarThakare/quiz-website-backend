const httpStatus = require("http-status");
const { Stream } = require("../models");
const ApiError = require("../utils/ApiError");
const { uploadFileToCloudinary } = require("./cloudinary.service")

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

  const result = await uploadFileToCloudinary(file.path)
  body.bgImage = result.secure_url;
  const stream = await Stream.create(body);
  return stream.name;
};

const getStreamById = async (streamId) => {
  const resp = await Stream.findOne({ _id: streamId });

  if (!resp) streamNotFoundErr();

  return resp;
};

module.exports = { addStream, getStreamById };
