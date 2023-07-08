const Joi = require('joi');


export function newArticleValidation(details){
    const schema = Joi.object({
        username: Joi.string().required(),
        category: Joi.string().required(),
        title: Joi.string().max(45).required(),
        body: Joi.string().max(1000).required()
    })

    return  schema.validate(details)
}


export function updateArticleValidation(details){
    const schema = Joi.object({
        username: Joi.string().required(),
        category: Joi.string().required(),
        title: Joi.string().required(),
        body: Joi.string().required()
    })

    return  schema.validate(details)
}