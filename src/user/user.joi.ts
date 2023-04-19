import * as Joi from 'joi';
import { PaidPlans } from './user.common';

const first_name = Joi.string();
const last_name = Joi.string();
const email = Joi.string().email({ tlds: { allow: false } });
const password = Joi.string();
const paid_plan = Joi.string().valid(...Object.values(PaidPlans));
const active = Joi.boolean();

export const createUserValidation = Joi.object().keys({
  first_name: first_name.required(),
  last_name: last_name.required(),
  email: email.required(),
  password: password.required(),
  paid_plan: paid_plan.optional(),
});

export const updateUserValidation = Joi.object().keys({
  first_name: first_name.optional(),
  last_name: last_name.optional(),
  email: email.optional(),
  paid_plan: paid_plan.optional(),
  active: active.optional(),
});

export const updateUserPassValidation = Joi.object().keys({
  password: password.required(),
});
