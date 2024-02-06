const httpStatus = require("http-status");
const { Topic, Subject } = require("../models");
const ApiError = require("../utils/ApiError");

const addNewTopic = async (subjectId, body) => {
  var payload = { ...body };

  const isValidSubjectId = await Subject.findOne({ _id: subjectId });

  if (!isValidSubjectId)
    throw new ApiError(httpStatus.NOT_FOUND, "Enter valid mongo id");

  const isAlreadyAdded = await Topic.findOne({
    subject: subjectId,
    name: payload.name,
  });

  if (isAlreadyAdded)
    throw new ApiError(
      httpStatus.CONFLICT,
      `${payload.name} topic is already added`
    );

  payload.subject = subjectId;

  await Topic.create(payload);

  return true;
};

const getTopicById = async (topicId) => {
  const topic = await Topic.findOne({ _id: topicId });

  if (!topic) 
    throw new ApiError(httpStatus.NOT_FOUND, "Enter valid Mongo id");

  return topic;
};

module.exports = { addNewTopic, getTopicById };
