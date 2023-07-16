const Joi = require('joi');

function newClusterValidation(details){
    const schema = Joi.object({
        cluster_name: Joi.string().max(45).required(),
        category: Joi.string().max(45).required(),
        supervisor_username: Joi.string().max(45).required()
    });

    return schema.validate(details);
}

function updateClusterValidation(details){
    const schema = Joi.object({
        cluster_name: Joi.string().max(45).required(),
        category: Joi.string().max(45).required(),
        supervisor_username: Joi.string().max(45).required()
    });

    return schema.validate(details);
}

module.exports = {
    newClusterValidation,
    updateClusterValidation
};