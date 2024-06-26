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
    name: payload.name, // This value will be converted to lowercase before the query
  });

  if (isAlreadyAdded)
    throw new ApiError(
      httpStatus.CONFLICT,
      `${payload.name} topic is already added`
    );

  payload.subject = subjectId;

  return await Topic.create(payload);
};

const getTopicById = async (topicId) => {
  const topic = await Topic.findOne({ _id: topicId });

  if (!topic) topicNotFoundErr();

  return topic;
};

const updateTopicById = async (topicId, updatedBody) => {

  const topic = await Topic.findOne({ _id: topicId });

  if (!topic) topicNotFoundErr();

  const resp = await Topic.findOneAndUpdate({ _id: topicId }, updatedBody);

  console.log(resp);
  if (resp.modifiedCount < 1) topicNotFoundErr();

  return resp;
};

const deleteTopicById = async (topicId) => {

  const topic = await Topic.findById(topicId);

  const resp = await Topic.deleteOne({ _id: topicId });

  if (resp.deletedCount < 1) topicNotFoundErr();
  return topic;

};

const getTopicsBySubjectId = async (subjectId) => {
  return await Topic.find({ subject: subjectId });
};

module.exports = {
  addNewTopic,
  getTopicById,
  updateTopicById,
  deleteTopicById,
  getTopicsBySubjectId,
};
