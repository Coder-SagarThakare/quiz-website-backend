const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { questionService } = require("../services");

const addQuestion = catchAsync(async (req, res) => {
    req.body.topic = req.params.topicId;
    req.body.createdBy = req.user._id;

    const question = await questionService.addQuestion(req.body, req.params.topicId)

    res.status(httpStatus.OK).send(question)
})

const deleteQuestionById = catchAsync(async (req, res) => {
    await questionService.deleteQuestionById(req.params.questionId)

    // res.status(httpStatus.OK).send("deleteQuestionById()");
    res
        .status(httpStatus.OK)
        .send({ message: "Question deleted successfully" });
})

module.exports = {
    addQuestion,
    deleteQuestionById
}
