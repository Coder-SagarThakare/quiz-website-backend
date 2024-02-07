const Joi = require("joi");

const addStream = {
    body : Joi.object().keys({
        name : Joi.string().required()
    }).required()
}

module.exports = {addStream}