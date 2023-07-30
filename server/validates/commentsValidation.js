const Joi = require('joi');

function newcommentValidation(details){
    const schema = Joi.object({
        title: Joi.string().max(100).required(),
        body: Joi.string().max(1000).required(),
        username: Joi.string().max(45).required()
    });

    return schema.validate(details);
}

function updatecommentValidation(details){
    const schema = Joi.object({
        title: Joi.string().max(45),
        body: Joi.string().max(45),
        username: Joi.string().max(45)
    });

    return schema.validate(details);
}

module.exports = {
    newcommentValidation,
    updatecommentValidation
}