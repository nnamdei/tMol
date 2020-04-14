/* eslint-disable arrow-parens */
const httpStatus = require("http-status");
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
    res.json(rates);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new rate
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const rate = new Rate(req.body);
    const savedRate = await rate.save();
    res.status(httpStatus.CREATED);
    res.json(savedRate);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete rate
 * @public
 */
exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Rate.findOneAndRemove(id);
    res.status(httpStatus.ACCEPTED);
  } catch (error) {
    next(error);
  }
  // rate
  //   .remove()
  //   .then(() => res.status(httpStatus.NO_CONTENT).end())
  //   .catch((e) => next(e));
};
