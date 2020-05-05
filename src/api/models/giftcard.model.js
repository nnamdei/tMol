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
        type: mongoose.Schema.Types.ObjectId,
        ref: "CardCategory",
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
