const httpStatus = require("http-status");
const { subjectService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const addNewSubject = catchAsync(async (req, res) => {
  const response = await subjectService.addNewSubject(req.body);
  res.status(httpStatus.CREATED).send(response);
});

const addTopic = catchAsync(async (req, res) => {

  req.body.topic = req.body.topic.toLowerCase()

  await subjectService.addTopic(
    req.params.subject_id,
    req.body.topic
  );

  res.status(httpStatus.CREATED).send({ message: "topic added successfully" })
  // res.status(httpStatus.CREATED).send(response)
});

const getSubjectById = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.params.subject_id)
  res.status(httpStatus.OK).send(subject)
})

const updateSubjectById = catchAsync(async (req, res) => {
  await subjectService.updateSubjectById(req.params.subject_id, req.body)
  res.status(httpStatus.OK).send({ message: "updated successfully" })
})

const deleteSubjectById = catchAsync(async (req, res) => {
  await subjectService.deleteSubjectById(req.params.subject_id)

  res.status(httpStatus.OK).send({ message: "Subject deleted successfully !!!" })
})

module.exports = { addNewSubject, addTopic, getSubjectById, updateSubjectById, deleteSubjectById };
