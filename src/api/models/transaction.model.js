const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const bcrypt = require("bcryptjs");
const moment = require("moment-timezone");
const jwt = require("jwt-simple");
const uuidv4 = require("uuid/v4");
const APIError = require("../utils/APIError");
const { env, jwtSecret, jwtExpirationInterval } = require("../../config/vars");

/**
 * Transaction Schema
 * @private
 */
const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardName: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    payableAmount: {
      type: String,
      required: true
    },
    comment: {
      type: String,
    },
    imageLink: {
      type: Array,
    },
    eCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Statics
 */
transactionSchema.statics = {
  /**
   * Get rate
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let transaction;

      if (mongoose.Types.ObjectId.isValid(id)) {
        transaction = await this.findById(id).exec();
      }
      if (transaction) {
        return transaction;
      }

      throw new APIError({
        message: "transaction does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List rates in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({
    page = 1,
    perPage = 30,
    cardName,
    subCategory,
    amount,
    paymentMethod,
    imageLink,
    eCode,
  }) {
    const options = omitBy(
      { cardName, subCategory, amount, paymentMethod, imageLink, eCode },
      isNil
    );

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef Transaction
 */
module.exports = mongoose.model("transaction", transactionSchema);
