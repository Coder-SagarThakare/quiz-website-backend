const httpStatus = require("http-status");
const { Question } = require("../models");
const ApiError = require("../utils/ApiError");

const addQuestion = async (questionBody,topicId) => {

    const result = await Question.findOne({question : questionBody.question})
    console.log("result",result);

    if(result)
        throw new Error("Question already added");

   return  await Question.create(questionBody)

}

module.exports = {
    addQuestion
}