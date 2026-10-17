import Joi from 'joi';

export  default  {
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(32).required(),
    }),

    register: Joi.object({
        name: Joi.string().min(2).max(50).required(),
        age: Joi.number().integer().min(10).max(200).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(32).required(),
    }),

}
