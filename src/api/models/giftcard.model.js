const mongoose = require("mongoose");

/**
 * User Roles
 */
const roles = ["user", "admin"];

/**
 * Rates Schema
 * @private
 */

const giftcardSchema = new mongoose.Schema(
  {
    card: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    cardCategory: [
      {
        title: {
          type: String,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
        },
      },
    ],
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

module.exports = mongoose.model("Giftcard", giftcardSchema);
