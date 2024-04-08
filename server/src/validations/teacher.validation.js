const Joi = require("joi");
const { objectId } = require("./custom.validation");
const { password } = require("./custom.validation");


const loginTeacher = {
  body: Joi.object().keys({
    
  })
}
const verifyTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.string().required().custom(objectId)
  })
}

module.exports = { verifyTeacher };
