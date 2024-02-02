const Joi = require("joi");

const addNewSubject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = { addNewSubject };
