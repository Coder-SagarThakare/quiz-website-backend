const Joi = require("joi");
const { objectId } = require("./custom.validation");

const paramsIdValidtion = Joi.string().required().custom(objectId);

const addQuestion = {
  body: Joi.object().keys({
    question: Joi.string().trim().required(),
    type: Joi.string()
      .trim()
      .required()
      .valid("singleSelect", "multiSelect", "true/false", "userInput"),
    options: Joi.when("type", {
      is: Joi.string().trim().valid("singleSelect", "multiSelect").required(),
      then: Joi.array()
        .items(Joi.string().trim().required())
        .length(4)
        .required(),
      otherwise: Joi.when("type", {
        is: "true/false",
        then: Joi.array()
          .items(Joi.string().trim().valid("true", "false").required())
          .length(2)
          .required(),
        otherwise: Joi.forbidden(),
      }),
    }),
    correctOption: Joi.when("type", {
      is: "singleSelect",
      then: Joi.number().required().min(1).max(4),
      otherwise: Joi.when("type", {
        is: "multiSelect",
        then: Joi.array()
          .items(Joi.number().required().min(1).max(4))
          .min(2)
          .required(),
        otherwise: Joi.when("type", {
          is: "true/false",
          then: Joi.number().required().min(1).max(2),
          otherwise: Joi.forbidden(),
        }),
      }),
    }),
    level: Joi.string().trim().required().valid("easy", "medium", "hard"),
  }),
  params: Joi.object().keys({
    topicId: paramsIdValidtion,
  }),
};

module.exports = { addQuestion };
