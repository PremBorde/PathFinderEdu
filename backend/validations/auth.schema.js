const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .trim(),
    email: Joi.string()
        .email()
        .required()
        .trim(),
    password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$'))
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords must match'
        })
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .trim(),
    password: Joi.string()
        .required()
});

module.exports = {
    registerSchema,
    loginSchema
}; 