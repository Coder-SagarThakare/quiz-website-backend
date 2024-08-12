const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { questionService } = require("../services");

const addQuestion = catchAsync(async (req, res) => {
<<<<<<< HEAD
  req.body.topic = req.params.topicId;

  const question = await questionService.addQuestion(
    req.body,
    req.params.topicId
  );
=======
    req.body.topic = req.params.topicId;
    req.body.createdBy = req.user._id;

    const question = await questionService.addQuestion(req.body, req.params.topicId)
>>>>>>> 9da06a2d4bc29182f3cd966e1c887e8e4300cf1e

  res.status(httpStatus.OK).send(question);
});

const getQuestionsByTopicId = catchAsync(async (req, res) => {
  const questionArray =await  questionService.getQuestionsByTopicId(
    req.params.topicId
  );

  res.status(httpStatus.OK).send(questionArray);
});

const deleteQuestionById = catchAsync(async (req, res) => {
    await questionService.deleteQuestionById(req.params.questionId)

    // res.status(httpStatus.OK).send("deleteQuestionById()");
    res
        .status(httpStatus.OK)
        .send({ message: "Question deleted successfully" });
})

module.exports = {
<<<<<<< HEAD
  addQuestion,
  getQuestionsByTopicId,
};
=======
    addQuestion,
    deleteQuestionById
}
>>>>>>> 9da06a2d4bc29182f3cd966e1c887e8e4300cf1e
