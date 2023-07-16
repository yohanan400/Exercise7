const Joi = require('joi');

function newVideoValidation(details){
    const schema = Joi.object({
        title: Joi.string().max(45).required(),
        username: Joi.string().max(45).required()
    });

    return schema.validate(details);
}

function updateVideoValidation(details){
    const schema = Joi.object({
        title: Joi.string().required(),
        username: Joi.string().required()
    });

    return schema.validate(details);
}

module.exports = {
    newVideoValidation,
    updateVideoValidation
};