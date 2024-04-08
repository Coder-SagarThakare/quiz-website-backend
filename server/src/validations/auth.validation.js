const Joi = require("joi");
const { password } = require("./custom.validation");

const registerStudent = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    gender: Joi.string().valid("male", "female", "other").required(),
  }),
};

const loginStudent = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const registerTeacher = {
  body: Joi.object().keys({
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

const loginTeacher = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const socialLogin = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const verifyOTP = {
  body: Joi.object().keys({
    otp: Joi.number().required(),
  }),
};

module.exports = {
  registerStudent,
  loginStudent,
  socialLogin,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyOTP,
  registerTeacher,
  loginTeacher
};
