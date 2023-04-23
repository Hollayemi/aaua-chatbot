const Joi = require("@hapi/joi");

const userValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        matricNo: Joi.string().min(9).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    })

    return schema.validate(data)
}

const adminValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    })

    return schema.validate(data)
}

const validateComplaint = data => {
    const schema = Joi.object({
        text: Joi.string().required(),
    })

    return schema.validate(data)
}


const validateLogin = data => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
    return schema.validate(data)
}


module.exports = {
    userValidation,
    validateComplaint,
    validateLogin,
    adminValidation
}