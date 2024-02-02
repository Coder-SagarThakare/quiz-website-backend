const httpStatus = require("http-status");
const { Subject } = require("../models");
const ApiError = require("../utils/ApiError");
const { subjectService } = require(".");

const addNewSubject = async (body) => {
  const isSubTaken = await Subject.isSubjectTaken(body.name);

  console.log(isSubTaken);
  if (isSubTaken)
    throw new ApiError(httpStatus.CONFLICT, "This Subject already added");

  body.name = body.name.toUpperCase();

  return Subject.create(body);
};

const addTopics = async (subjectId, topics) => {
  return subjectId;
};

module.exports = { addNewSubject, addTopics };
