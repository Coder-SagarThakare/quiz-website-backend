const Joi = require("joi");
const { objectId } = require("./custom.validation");

const paramsIdValidtion = Joi.string().required().custom(objectId);
const addNewTopic = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
  }),
  params: Joi.object().keys({
    subject_id: paramsIdValidtion,
  }),
};

const getTopicById = Joi.object().keys({
  params: paramsIdValidtion,
});

module.exports = { addNewTopic ,getTopicById};
