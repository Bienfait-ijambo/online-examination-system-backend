const Joi = require('joi');

const authSchema=Joi.object({
 name: Joi.string().required(),
 email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
 user_type: Joi.string().required(),
 password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})

const loginSchema=Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})

module.exports={
    authSchema,
    loginSchema
}