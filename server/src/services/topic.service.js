const httpStatus = require("http-status");
const { Topic, Subject } = require("../models");
const ApiError = require("../utils/ApiError");

const topicNotFoundErr = () => {
  throw new ApiError(httpStatus.NOT_FOUND, "Topic not found ");
};

const addNewTopic = async (subjectId, body) => {
  var payload = { ...body };

  const isValidSubjectId = await Subject.findOne({ _id: subjectId });

  if (!isValidSubjectId)
    throw new ApiError(httpStatus.NOT_FOUND, "Subject not found");

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

  if (!topic) topicNotFoundErr();

  return topic;
};

const updateTopicById = async (topicId, updatedBody) => {
  const resp = await Topic.updateOne({ _id: topicId }, updatedBody);

  if (resp.modifiedCount < 1) topicNotFoundErr();

  return true;
};

module.exports = { addNewTopic, getTopicById, updateTopicById };
