/* eslint-disable arrow-parens */
const httpStatus = require("http-status");
const { omit } = require("lodash");
const User = require("../models/user.model");
const emailProvider = require("../services/emails/emailProvider");
/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    console.log(req.query);

    const users = await User.list(req.query);
    const transformedUsers = users.map((user) => user.transform());
    res.json(transformedUsers);
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
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    emailProvider(user);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true,
    });

    if (updatedUser) {
      return res.status(httpStatus.CREATED).json({
        message: "User updated",
        updatedUser,
      });
    }
    throw new Error("Update unsuccesful");
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(id, "HI");

    await User.findOneAndRemove(id);
    return res.status(httpStatus.OK).json({
      message: "User deleted",
    });
  } catch (error) {
    return next(error);
  }
};
