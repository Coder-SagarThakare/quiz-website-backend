const Joi = require("joi");

const addNewSubject = {
  body: Joi.object().keys({
    subject: Joi.string().required(),
  }),
};

module.exports = { addNewSubject };
