const httpStatus = require("http-status");
const { Subject } = require("../models");
const ApiError = require("../utils/ApiError");

const addNewSubject = async (body) => {
  body.name = body.name.toUpperCase();

  const isSubTaken = await Subject.isSubjectTaken(body.name);

  if (isSubTaken)
    throw new ApiError(httpStatus.CONFLICT, "This Subject already added");

  return Subject.create(body);
};

const addTopic = async (subjectId, topic) => {
  const isTopicAdded = await Subject.isTopicTaken(subjectId, topic);

  if (isTopicAdded)
    throw new ApiError(httpStatus.CONFLICT, "Topic is already added")

  await Subject.updateOne({ _id: subjectId }, { $push: { topics: topic } })

  return;
};

module.exports = { addNewSubject, addTopic };

