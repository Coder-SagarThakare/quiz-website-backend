const Joi = require("joi");
const { objectId } = require("./custom.validation");

const paramsValidation = Joi.object().keys({
  streamId: Joi.string().required().custom(objectId),
});
const nameValidation = Joi.string().required();

const addStream = {
  body: Joi.object()
    .keys({
      name: nameValidation,
    })
    .required(),
};

const getStreamById = {
  params: paramsValidation,
};

const updateStreamById = {
  params: paramsValidation,
  body: Joi.object().keys({
    name: nameValidation,
  }),
};

const deleteStreamById = {
  params: paramsValidation,
};

module.exports = {
  addStream,
  getStreamById,
  updateStreamById,
  deleteStreamById,
};
