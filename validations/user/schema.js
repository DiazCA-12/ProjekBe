const Joi = require("joi");

exports.create = Joi.object().keys({
  nama: Joi.string().min(3).max(25).required(),
  email: Joi.string()
    .email()
    .pattern(/@(gmail\.com|yahoo\.com)$/),
  password: Joi.string().min(8).max(20).required(),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required(),
});

exports.update = Joi.object().keys({
  nama: Joi.string().min(3).max(25).required(),
  email: Joi.string()
    .email()
    .pattern(/@(gmail\.com|yahoo\.com)$/),
  password: Joi.string().min(8).max(20).required(),
});