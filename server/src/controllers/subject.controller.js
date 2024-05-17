const httpStatus = require("http-status");
const { subjectService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const addNewSubject = catchAsync(async (req, res) => {

  if (!req.file) {
    throw new ApiError(httpStatus.NOT_FOUND, "Please upload an image.");
  }

  req.body.stream = req.params.streamId;
  req.body.createdBy = req.user._id;

  const response = await subjectService.addNewSubject(req.body, req.file.buffer);
  res.status(httpStatus.CREATED).send(response);
});

const getAllSubjects = catchAsync(async (req, res) => {
  const subjects = await subjectService.getAllSubjects();
  res.status(httpStatus.OK).send(subjects);
});
// working api proper ^

const addTopic = catchAsync(async (req, res) => {
  // req.body.topic = req.body.topic.toLowerCase()

  await subjectService.addTopic(
    req.params.subject_id,
    req.body.topic.toLowerCase()
  );

  res.status(httpStatus.CREATED).send({ message: "topic added successfully" });
});

const getSubjectsByStreamId = catchAsync(async (req, res) => {
  const subjects = await subjectService.getSubjectsByStreamId(
    req.params.streamId
  );
  res.status(httpStatus.OK).send(subjects);
});

const updateTopics = catchAsync();
const getSubjectById = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.params.subject_id);
  res.status(httpStatus.OK).send(subject);
});

const updateSubjectById = catchAsync(async (req, res) => {
  await subjectService.updateSubjectById(req.params.subject_id, req.body);
  res.status(httpStatus.OK).send({ message: "Subject updated successfully" });
});

const deleteSubjectById = catchAsync(async (req, res) => {
  await subjectService.deleteSubjectById(req.params.subject_id);

  res
    .status(httpStatus.OK)
    .send({ message: "Subject deleted successfully !!!" });
});

module.exports = {
  addNewSubject,
  addTopic,
  getSubjectsByStreamId,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,
  getAllSubjects,
};
