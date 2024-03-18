const Joi = require("joi");
const { objectId } = require("./custom.validation");
const { password } = require("./custom.validation");

const registerTeacher = Joi.object().keys({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().custom(password),
  mobNo: Joi.number().length(10).required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  organization: Joi.string().required(),
  higherEducation: Joi.string().required(),
  specialization: Joi.string().required(),
  teachingExperience: Joi.string().required(),
  birthDate: Joi.date().required(),
  linkedIn: Joi.string(),
  github: Joi.string(),
});

module.exports = { registerTeacher };
