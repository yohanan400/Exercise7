const Joi = require('joi');

function newSummaryValidation(detailes) {
    const schema = Joi.object({
        title: Joi.string().max(45).required(),
        body: Joi.required(),
        category: Joi.string().max(45).required(),
        username: Joi.string().required(),
        isVisible: Joi.boolean().default(true)
    });

    return schema.validate(details)
}

function updateSummaryValidation(detailes) {
    const schema = Joi.object({
        title: Joi.string().max(45),
        category: Joi.string().max(45),
        username: Joi.string(),
        isVisible: Joi.boolean()
    });

    return schema.validate(details)
}

module.exports = {
    newSummaryValidation,
    updateSummaryValidation,
    updateSummaryValidation
};