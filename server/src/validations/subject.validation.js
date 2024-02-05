const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addNewSubject = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
  }),
};

const paramValidation = Joi.object().keys({
  subject_id: Joi.string().required().custom(objectId)
})

const getSubjectById = {
  params: paramValidation
}
const updateSubjectById = {
  params: paramValidation,
  body: Joi.object().keys({
    name: Joi.string().required().trim()
  })
}

const deleteSubjectById = {
  params: paramValidation
}



module.exports = { addNewSubject, getSubjectById, updateSubjectById, deleteSubjectById };
