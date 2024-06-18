const Joi = require("joi");
const { objectId } = require("./custom.validation");

const paramValidation = Joi.object().keys({
  subject_id: Joi.string().required().custom(objectId),
});

const imageSchema = Joi.object({
  filename: Joi.string()
    .pattern(/\.(jpg|jpeg|png)$/i)
    .required()
    .messages({
      'string.pattern.base': 'Filename must have a valid image extension (jpg, jpeg, png).',
    }),
  mimetype: Joi.string()
    .valid('image/jpeg', 'image/png')
    .required()
    .messages({
      'any.only': 'Mimetype must be one of image/jpeg, image/png.',
    }),
  size: Joi.number()
    .max(2 * 1024 * 1024) // Max size 2MB
    .required()
    .messages({
      'number.max': 'Image size must be less than or equal to 5MB.',
    }),
});

const addNewSubject = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
    subjectBgImage: imageSchema.required()
  }),
  params: Joi.object().keys({
    streamId: Joi.string().required().custom(objectId),
  }),
};

const getSubjectById = {
  params: paramValidation,
};

const updateSubjectById = {
  params: paramValidation,
  body: Joi.object().keys({
    name: Joi.string().trim(),
    topics: Joi.array().items(Joi.string().required())
  }).or('name', 'topics'),
};

const deleteSubjectById = {
  params: paramValidation,
};



module.exports = {
  addNewSubject,
  getSubjectById,
  updateSubjectById,
  deleteSubjectById,

};
