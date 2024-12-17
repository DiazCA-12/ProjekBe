const Joi = require("joi");
const product = require("../../models/product");

exports.create = Joi.object().keys({
  namaproduct: Joi.string().min(3).max(25).required(),
  Category: Joi.string().min(1).max(25).required(),
  harga: Joi.number().precision(2).required(), // Menggunakan number dengan precision 2 untuk harga
});

exports.update = Joi.object().keys({
  namaproduct: Joi.string().min(3).max(25).required(),
  Category: Joi.string().min(1).max(25).required(),
  harga: Joi.number().precision(2).required(), // Menggunakan number dengan precision 2 untuk harga
});
