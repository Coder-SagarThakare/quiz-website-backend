const Joi = require("joi");
const { objectId } = require("./custom.validation");

const paramsIdValidtion = Joi.string().required().custom(objectId);

const addQuestion = {
    body: Joi.object().keys({
      question: Joi.string().trim().required(),
      type : Joi.string().required(),
      options : Joi.array().items(Joi.string().required()),
      level : Joi.string().required(),
      correctOption : Joi.number()
    }),
    params: Joi.object().keys({
      topicId : paramsIdValidtion,
    }),
  };

  module.exports  = { addQuestion}