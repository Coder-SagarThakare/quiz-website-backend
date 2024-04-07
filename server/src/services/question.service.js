const httpStatus = require("http-status");
const { Question } = require("../models");
const ApiError = require("../utils/ApiError");

const addQuestion = async (questionBody) => {

    const result = await Question.find({question : questionBody.question})

    console.log(result);
}

module.exports = {
    addQuestion
}