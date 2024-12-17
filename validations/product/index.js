const { create, update } = require("./schema");
const {product} = require("../../models");
const productValidation = {
  validateCreatePayload : async (payload) => {
    const validationResult = create.validate(payload); 
    if (validationResult.error) {
      return {
        errors: validationResult.error.details.map((err) => err.message),
      };
    }
    return { errors: null };
  },

  validateUpdatePayload: (payload) => {
    const validationResult = update.validate(payload);
    if (validationResult.error) {
      return {
        errors: validationResult.error.details.map((err) => err.message),
      };
    }
    return { errors: null };
  },
};

module.exports = productValidation;