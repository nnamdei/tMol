const httpStatus = require("http-status");
const Transaction = require("../models/transaction.model");

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

// /**
//  * Get rate
//  * @public
//  */

// exports.get = (req, res) => res.json(req.locals.transaction.transform());

exports.create = async (req, res, next) => {
  try {
    const transactionDetails = new Transaction(req.body);
    const savedTransactionDetails = await transactionDetails.save();
    res.status(httpStatus.CREATED);
    return res.json(savedTransactionDetails);
  } catch (error) {
    return next(error, "Error");
  }
};
