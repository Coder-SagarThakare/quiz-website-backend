const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addNewTopic = {
  body: Joi.object().keys({
    topic: Joi.string().trim().required(),
  }),
  params: Joi.object().keys({
    subject_id: Joi.string().required().custom(objectId),
  }),
};

module.exports = { addNewTopic };
