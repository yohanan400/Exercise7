const Joi = require('joi');


function userLoginDetailsValidate(details){
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    return  schema.validate(details)
}

function userRegisterDetailsValidate(details){
    const schema = {
        fullname : Joi.string().required(),
        username : Joi.string().min(3).max(45).required(),
        password : Joi.string().min(8).max(16).required(),
        email : Joi.string().email().required()
    };

    return  schema.validate(details)
}

function userUpdateDetailsValidate(details){
    const schema = {
        fullname : Joi.string().required(),
        password : Joi.string().min(8).max(16).required(),
        email : Joi.string().email().required()
    };

    return  schema.validate(details)
}

module.exports += userLoginDetailsValidate;
module.exports += userRegisterDetailsValidate;
module.exports += userUpdateDetailsValidate;