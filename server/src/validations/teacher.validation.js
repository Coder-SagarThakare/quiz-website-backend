const Joi = require("joi");
const { objectId } = require("./custom.validation");
const { password } = require("./custom.validation");

const registerTeacher = {
  body : Joi.object().keys({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    mobNo: Joi
      .string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    organization: Joi.string().required(),
    highestEducation: Joi.string().required(),
    specialization: Joi.string().required(),
    teachingExperience: Joi.string().required(),
    birthDate: Joi.date().required(),
    linkedIn: Joi.string(),
    github: Joi.string(),
  })
};

module.exports = { registerTeacher };
