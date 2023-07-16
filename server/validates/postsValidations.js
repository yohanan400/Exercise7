const Joi = require('joi');

function newPostValidation(details){
    const schema = Joi.object({
        title: Joi.string().max(45).required(),
        body: Joi.string().max(45).required(),
        username: Joi.string().max(45).required()
    });

    return schema.validate(details);
}

function updatePostValidation(details){
    const schema = Joi.object({
        title: Joi.string().max(45),
        body: Joi.string().max(45),
        username: Joi.string().max(45)
    });

    return schema.validate(details);
}

module.exports = {
    newPostValidation,
    updatePostValidation
}