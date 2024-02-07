const httpStatus = require("http-status");
const { Stream } = require("../models");
const ApiError = require("../utils/ApiError");

const streamNotFoundErr = () => {
  throw new ApiError(httpStatus.NOT_FOUND, "Stream not found");
};
const addStream = async (body) => {
  const isStreamAdded = await Stream.findOne({ name: body.name });
  console.log(isStreamAdded);

  if (isStreamAdded)  
    throw new ApiError(httpStatus.NOT_FOUND,`${body.name} Stream already exist`);

  const stream = await Stream.create(body);
  return stream.name;
};

module.exports = { addStream };
