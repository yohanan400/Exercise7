const Joi = require('joi');


function userLoginDetailsValidate(details){
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    return  schema.validate(details)
}

function userRegisterDetailsValidate(details){
    const schema = Joi.object({
        fullname : Joi.string().required(),
        username : Joi.string().min(3).max(45).required(),
        password : Joi.string().min(8).max(16).required(),
        email : Joi.string().email().required(),
        access_level_Id: Joi.number(),
        role_id: Joi.number()
    });

    return  schema.validate(details)
}

function userUpdateDetailsValidate(details){
    const schema = Joi.object({
        username: Joi.string().max(45),
        fullname : Joi.string().required(),
        password : Joi.string().min(8).max(16).required(),
        email : Joi.string().email().required(),
        access_level_Id: Joi.number(),
        role_id: Joi.number()
    });

    return  schema.validate(details)
}

module.exports = {
    userLoginDetailsValidate,
    userRegisterDetailsValidate,
    userUpdateDetailsValidate
}