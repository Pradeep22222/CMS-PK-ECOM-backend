import Joi from "joi";
export const FNAME = Joi.string().max(20).required();
export const LNAME = Joi.string().max(20).required();
export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const PASSWORD = Joi.string().max(100).required();
export const PHONE = Joi.string().max(100).required();
export const ADDRESS = Joi.string().max(100).allow("", null);
export const DATE = Joi.date();

export const SHORTSTR = Joi.string().max(50);
export const LONGSTR = Joi.string().max(500);
