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

const getTopicById = {
  params: Joi.object().keys({
    topic_id: paramsIdValidtion,
  }),
};
const updateTopicById = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = { addNewTopic, getTopicById, updateTopicById };
