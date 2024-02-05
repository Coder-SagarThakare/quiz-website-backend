const httpStatus = require("http-status");
const { Topic, Subject } = require("../models");
const ApiError = require("../utils/ApiError");

const addNewTopic = async (subjectId, topic) => {
  const isValidSubjectId = await Subject.findOne({ _id: subjectId });

  if (!isValidSubjectId)
    throw new ApiError(httpStatus.NOT_FOUND, "Enter valid mongo id");

  const isAlreadyAdded = await Topic.findOne({
    subject: subjectId,
    name: topic,
  });

  if (isAlreadyAdded)
    throw new ApiError(httpStatus.CONFLICT, `${topic} topic is already added`);

  const payload = {
    subject: subjectId,
    name: topic,
  };

  await Topic.create(payload);

  return true;
};

module.exports = { addNewTopic };
