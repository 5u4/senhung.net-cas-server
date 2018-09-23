const Joi      = require('joi');
const validate = require('express-validation');

const checkEmailExistenceValidator = validate({
    params: {
        email: Joi
            .string()
            .email()
            .required(),
    },
});

const checkUsernameExistenceValidator = validate({
    params: {
        username: Joi
            .string()
            .required(),
    },
});

const registerValidator = validate({
    body: {
        username: Joi
            .string()
            .required(),
        
        email: Joi
            .string()
            .email()
            .required(),

        password: Joi
            .string()
            .required(),
    },
});

const loginValidator = validate({
    body: {
        username: Joi
            .string(),
        
        email: Joi
            .string()
            .email(),

        password: Joi
            .string()
            .required(),
    },
});

const getUserValidator = validate({
    headers: {
        'x-access-token': Joi
            .required(),
    },
});

module.exports = {
    checkEmailExistenceValidator,
    checkUsernameExistenceValidator,
    registerValidator,
    loginValidator,
    getUserValidator,
};
