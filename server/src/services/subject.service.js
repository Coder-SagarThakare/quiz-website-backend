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

  console.log("topic", topic);
  await Subject.updateOne({ _id: subjectId }, { $push: { topics: topic } })

  return;
};

const notValidMongoID = () => { throw new ApiError(httpStatus.NOT_FOUND, "Enter valid mongo-id") }

const getSubjectById = async (subjectId) => {
  const resp = await Subject.findById(subjectId)

  if (!resp)
    notValidMongoID()
  return resp;
}

const updateSubjectById = async (subjectId, updatedBody) => {
  console.log(subjectId, updatedBody);
  const resp = await Subject.findOneAndUpdate({ _id: subjectId }, { ...updatedBody })

  if (!resp)
    notValidMongoID()

  return resp;
}

const deleteSubjectById = async (subjectId) => {
  const resp = await Subject.deleteOne({ _id: subjectId })

  if (!resp)
    notValidMongoID()
  return resp;
}

module.exports = { addNewSubject, addTopic, getSubjectById, updateSubjectById, deleteSubjectById };