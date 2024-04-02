import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(8)
    .max(15)
    .pattern(/^[0-9()+\- ]+$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string()
    .min(8)
    .max(15)
    .pattern(/^[0-9()+\- ]+$/),
}).min(1);
