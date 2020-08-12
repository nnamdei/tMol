/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
const httpStatus = require("http-status");
const Transaction = require("../models/transaction.model");
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
exports.listUsers = async (req, res, next) => {
  try {
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
exports.createUser = async (req, res, next) => {
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
exports.updateUser = async (req, res, next) => {
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
exports.removeUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndRemove(id);
    return res.status(httpStatus.OK).json({
      message: "User deleted",
    });
  } catch (error) {
    return res.json({ message: "User not deleted" });
  }
};

/**
 * Get transaction list
 * @public
 */
exports.listTransanction = async (req, res, next) => {
  try {
    console.log(req.query);

    const transactions = await Transaction.list(req.query);
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

/**
 * Approve a transaction
 * @public
 */
exports.approveTransaction = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { remark } = req.body;
    const specificTransaction = await Transaction.findById(id);
    if (
      specificTransaction.status === "Pending" ||
      specificTransaction.status === "Declined"
    ) {
      specificTransaction.status = "Approved";
      specificTransaction.remark = remark;
      await specificTransaction.save();
      res.json({
        message: "Transaction Approved",
        specificTransaction,
      });
    }
    throw new Error("Error");
  } catch (error) {
    next(error);
  }
};

/**
 * Reject a transaction
 * @public
 */
exports.rejectTransaction = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { remark } = req.body;
    const specificTransaction = await Transaction.findById(id);
    if (specificTransaction.status === "Pending") {
      specificTransaction.remark = remark;
      specificTransaction.status = "Declined";
      await specificTransaction.save();
      res.json({
        message: "Transaction Declined",
        specificTransaction,
      });
    }
    throw new Error("Transaction was already approved");
  } catch (error) {
    next(error);
  }
};
