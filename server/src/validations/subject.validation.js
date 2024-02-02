const Joi = require("joi");

const addNewSubject = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
  }),
};

const addTopics = {
  body : Joi.object().keys({
    topics : Joi.array().items(Joi.string().required()).required()
  })
}

module.exports = { addNewSubject };
