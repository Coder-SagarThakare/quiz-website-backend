const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { topicService } = require("../services");

const addNewTopic = catchAsync(async (req, res) => {
  req.body.name = req.body.name.toLowerCase();

  await topicService.addNewTopic(req.params.subject_id, req.body);

  res.status(httpStatus.OK).send({ message: "Topic added successfully" });
});

const getTopicById = catchAsync(async (req, res) => {
  const topic = await topicService.getTopicById(req.params.topic_id);

  res.status(httpStatus.OK).send(topic);
});

const updateTopicById = catchAsync(async (req, res) => {
  req.body.name = req.body.name.toLowerCase();
  await topicService.updateTopicById(req.params.topic_id, req.body);

  res.status(httpStatus.OK).send({ message: "Topic updated successfully" });
});

const deleteTopicById = catchAsync(async (req, res) => {
  await topicService.deleteTopicById(req.params.topic_id);
  res.status(httpStatus.OK).send({ message: "Topic deleted successfully" });
});

module.exports = {
  addNewTopic,
  getTopicById,
  updateTopicById,
  deleteTopicById,
};
