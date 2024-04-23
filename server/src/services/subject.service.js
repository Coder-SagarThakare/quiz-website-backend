const httpStatus = require("http-status");
const { Subject, Topic } = require("../models");
const ApiError = require("../utils/ApiError");

const SubjectNotFoundErr = () => {
  throw new ApiError(httpStatus.NOT_FOUND, "Subject not found ");
};

const getAllSubjects = async ()=>{
  return await Subject.find();
}

const addNewSubject = async (body) => {
  // body.name = body.name.toUpperCase();

  const isSubTaken = await Subject.isSubjectTaken(body.name);

  if (isSubTaken)
    throw new ApiError(httpStatus.CONFLICT, "This Subject already added");

  return await  Subject.create(body);
};

const addTopic = async (subjectId, topic) => {
  const isTopicAdded = await Subject.isTopicTaken(subjectId, topic);

  if (isTopicAdded)
    throw new ApiError(httpStatus.CONFLICT, "Topic is already added");

  return;
};

const getSubjectById = async (subjectId) => {
  const resp = await Subject.findById(subjectId);

  if (!resp) SubjectNotFoundErr();
  return resp;
};

const updateSubjectById = async (subjectId, updatedBody, reArrangeTopics=false) => {

  if(reArrangeTopics){
    // NEED TO ARRANGE TOPIC 

    // const subject = await Subject.find(subjectId);
    // updatedBody = subject.topics.push(updatedBody) 
  }

  const resp = await Subject.findOneAndUpdate(
    { _id: subjectId },
    { ...updatedBody }
  );

  if (!resp) SubjectNotFoundErr();

  return resp;
};

const deleteSubjectById = async (subjectId) => {
  const subject = await Subject.findOne({ _id: subjectId });

  if (!subject) SubjectNotFoundErr();

  await Topic.deleteMany({ subject: subjectId });

  const resp = await Subject.deleteOne({ _id: subjectId }); 

  if (!resp) SubjectNotFoundErr();

  return resp;
};

const getSubjectsByStreamId = async (streamId)=>{
  return await Subject.find({stream : streamId})
}


module.exports = {
  addNewSubject,
  getAllSubjects,
  addTopic,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,
  getSubjectsByStreamId
};
