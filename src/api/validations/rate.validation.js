const Joi = require("joi");
const Rate = require("../models/rate.model");

module.exports = {
  // GET /v1/admin/rates
  listRate: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      role: Joi.string().valid(Rate.roles),
    },
  },

  // POST /v1/admin/rates
  createRate: {
    body: {
      name: Joi.string().max(128),
      range: Joi.string().required(),
      price: Joi.number().required(),
      role: Joi.string().valid(Rate.roles),
    },
  },
};
