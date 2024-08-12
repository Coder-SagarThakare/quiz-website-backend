const httpStatus = require("http-status");
const { Question, Topic } = require("../models");
const ApiError = require("../utils/ApiError");

const addQuestion = async (questionBody, topicId) => {
  const topic = await Topic.findById(topicId);
  console.log(topic);

  if (!topic) throw new ApiError(httpStatus.NOT_FOUND, "Topic not found ");

  const result = await Question.findOne({ question: questionBody.question });

  if (result) throw new Error("Question already added");

  return await Question.create(questionBody);
};

const getQuestionsByTopicId = async (topicId) => {
  const questionArray = await Question.find({ topic: topicId }).limit(5);
  console.log(questionArray);
  return questionArray;
};

const QuestionNotFoundErr = () => {
    throw new ApiError(httpStatus.NOT_FOUND, "Question not found ");
}

const deleteQuestionById = async (questionId) => {
    const resp = await Question.deleteOne({ _id: questionId })

    if (!resp.deletedCount) QuestionNotFoundErr();

    return resp
}

module.exports = {
    addQuestion,
    deleteQuestionById,
    getQuestionsByTopicId,
}
