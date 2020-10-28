const joi = require("@hapi/joi")

const registerSchema = joi.object({
    name: 
        joi
        .string()
        .required(), 
    email: 
        joi
        .string()
        .email()
        .required(), 
    password: 
        joi
        .string()
        .required()
        .min(4)
        .max(20), 
    password2: 
        joi
        .ref('password'),     
}) 


const loginSchema = joi.object({
    email: 
        joi
        .string()
        .email()
        .required(), 
    password: 
        joi
        .string()
        .required()
        .min(4)
        .max(20) 
})


module.exports.registerValidator = registerSchema
module.exports.loginValidator = loginSchema
