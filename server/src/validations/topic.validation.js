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
  params: Joi.object().keys({
    topic_id: paramsIdValidtion,
  }),
};

const deleteTopicById = {
  params: Joi.object().keys({
    topic_id: paramsIdValidtion,
  }),
};

const getTopicsBySubjectId = {
  params: Joi.object().keys({
    subject_id: paramsIdValidtion,
  }),
};



module.exports = {
  addNewTopic,
  getTopicById,
  updateTopicById,
  deleteTopicById,
  getTopicsBySubjectId,
};
