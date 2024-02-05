const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { topicService } = require("../services");

const addNewTopic = catchAsync(async (req, res) => {
  await topicService.addNewTopic(
    req.params.subject_id,
    req.body.topic.toLowerCase()
  );

  res.status(httpStatus.OK).send({ message: "Topic added successfully" });
});

module.exports = { addNewTopic };
