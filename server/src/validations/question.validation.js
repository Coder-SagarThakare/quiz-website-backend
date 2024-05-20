const Joi = require("joi");
const { objectId } = require("./custom.validation");

const paramsIdValidtion = Joi.string().required().custom(objectId);

const addQuestion = {
    body: Joi.object().keys({
      question: Joi.string().trim().required(),
      type : Joi.string().required().valid('singleSelect', 'multiSelect', 'true/false', 'userInput'),
      // options : Joi.array().items(Joi.string().required()),
      options: Joi.when('type', {
        is: Joi.string().valid('singleSelect', 'multiSelect').required(),
        then: Joi.array().items(Joi.string().required()).length(4).required(),
      }),
      level : Joi.string().required(),
      correctOption : Joi.number()
    }),
    params: Joi.object().keys({
      topicId : paramsIdValidtion,
    }),
  };

  module.exports  = { addQuestion}