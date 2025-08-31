const Joi = require('joi');
const { AppError } = require('./errorHandler');

const validate = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (validationResult.error) {
        const errorMessage = validationResult.error.details
            .map(detail => detail.message)
            .join(', ');
        
        return next(new AppError(errorMessage, 400));
    }

    req.body = validationResult.value;
    next();
};

module.exports = validate; 