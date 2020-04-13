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
 * User Roles
 */
const roles = ["user", "admin"];

/**
 * Rates Schema
 * @private
 */

const rateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 11,
    },
    range: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: roles,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Statics
 */
rateSchema.statics = {
  roles,

  /**
   * Get rate
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let rate;

      if (mongoose.Types.ObjectId.isValid(id)) {
        rate = await this.findById(id).exec();
      }
      if (rate) {
        return rate;
      }

      throw new APIError({
        message: "Rate does not exist",
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
  list({ page = 1, perPage = 30, name, range, price, role }) {
    const options = omitBy({ name, range, price, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

/**
 * @typedef Rate
 */
module.exports = mongoose.model("Rate", rateSchema);
