const httpStatus = require("http-status");
const { Stream } = require("../models");
const ApiError = require("../utils/ApiError");

const streamNotFoundErr = () =>{ throw new ApiError(httpStatus.NOT_FOUND, "Stream not found")}

const addStream = async (body) => {
  const isStreamAdded = await Stream.findOne({ name: body.name });

  if (isStreamAdded)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `${body.name} Stream already exist`
    );

  const stream = await Stream.create(body);
  return stream.name;
};

const getStreamById = async (streamId) => {
  const resp = await Stream.findOne({ _id: streamId });

  if (!resp) streamNotFoundErr();

  return resp;
};

module.exports = { addStream, getStreamById };
