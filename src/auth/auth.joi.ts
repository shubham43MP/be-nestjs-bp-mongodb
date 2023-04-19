import * as Joi from 'joi';

export const userLoginValidation = Joi.object().keys({
  username: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});
