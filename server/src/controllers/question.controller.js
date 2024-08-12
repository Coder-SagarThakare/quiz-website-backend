const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { questionService } = require("../services");

const addQuestion = catchAsync(async (req, res) => {
  req.body.topic = req.params.topicId;

  const question = await questionService.addQuestion(
    req.body,
    req.params.topicId
  );

  res.status(httpStatus.OK).send(question);
});

const getQuestionsByTopicId = catchAsync(async (req, res) => {
  const questionArray =await  questionService.getQuestionsByTopicId(
    req.params.topicId
  );

  res.status(httpStatus.OK).send(questionArray);
});

module.exports = {
  addQuestion,
  getQuestionsByTopicId,
};
