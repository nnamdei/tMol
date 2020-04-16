const Joi = require("joi");
const Giftcard = require("../models/transaction.model");

module.exports = {
  // POST /v1/giftcard
  validateGiftCard: {
    body: {
      cardName: Joi.string().required(),
      subCategory: Joi.string().required(),
      amount: Joi.string().required(),
      paymentMethod: Joi.string().required(),
      imageLink: Joi.string(),
      eCode: Joi.string(),
    },
  },
};
