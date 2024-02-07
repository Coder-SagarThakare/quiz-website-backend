const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addStream = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
    })
    .required(),
};

const getStreamById = {
  params: Joi.object().keys({
    stream_id: Joi.string().required().custom(objectId),
  }),
};

module.exports = { addStream, getStreamById };
