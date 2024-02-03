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

module.exports = { addNewSubject, addTopic };
