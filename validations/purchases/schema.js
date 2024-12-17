const Joi = require("joi");
const product = require("../../models/purchases");

exports.create = Joi.object().keys({
  product_id: Joi.number().required(),
  jumlah: Joi.number().required(),
  harga: Joi.number().required(),
 });

exports.update = Joi.object().keys({
    product_id: Joi.number().required(),
    jumlah: Joi.number().required(),
    harga: Joi.number().required(),
});