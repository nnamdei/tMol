const httpStatus = require("http-status");
const Transaction = require("../models/transaction.model");
const {
  getFcmTokens,
  sendToDevice,
  sendNotificationToAdmin,
} = require("../services/firebaseMessage");
// console.log("HI");

// /**
//  * Load user and append to req.
//  * @public
//  */
// exports.load = async (req, res, next, id) => {
//   try {
//     const transaction = await Transaction.get(id);
//     req.locals = { transaction };
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// };

/**
 * List transactions
 * @public
 */

// exports.get = (req, res) => res.json(req.locals.transaction.transform());

exports.list = async (req, res, next) => {
  const _id = req.user._id;
  try {
    const foundTransaction = await Transaction.find({ user: _id }).populate(
      "user"
    );
    if (!foundTransaction) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Not found",
      });
    }
    return res.status(200).json({
      message: "Success",
      foundTransaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const transactionDetails = new Transaction({
      ...req.body,
      user: req.user._id,
    });
    const savedTransactionDetails = await transactionDetails.save();
    res.status(httpStatus.CREATED);
    let tokenList = await getFcmTokens("admin");
    if (tokenList.length !== 0) {
      await sendToDevice(
        tokenList,
        {
          transactionType: savedTransactionDetails.cardName,
          name: req.user.name,
        },
        "admin"
      );
    }
    const body = {
      title: "New Trade!",
      content: savedTransactionDetails.cardName,
    };
    sendNotificationToAdmin(body, req.user._id);
    return res.json(savedTransactionDetails);
  } catch (error) {
    return next(error, "Error");
  }
};
