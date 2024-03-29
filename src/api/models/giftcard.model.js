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
    },
    cardCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CardCategory",
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isWhatsapp: {
      type: Boolean,
      default: false
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

module.exports = mongoose.model("Giftcard", giftcardSchema);
