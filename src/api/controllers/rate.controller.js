/* eslint-disable arrow-parens */
const httpStatus = require("http-status");
const { omit } = require("lodash");
const Rate = require("../models/rate.model");

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const rate = await Rate.get(id);
    req.locals = { rate };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get rate
 * @public
 */
exports.get = (req, res) => res.json(req.locals.rate.transform());

exports.list = async (req, res, next) => {
  try {
    const rates = await Rate.list(req.query);
    const transformedRates = await rates.map((rate) => rate.transform());
    res.json(transformedRates);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const rate = new Rate(req.body);
    const savedRate = await rate.save();
    res.status(httpStatus.CREATED);
    res.json(savedRate.transform());
  } catch (error) {
    next(error);
  }
};
