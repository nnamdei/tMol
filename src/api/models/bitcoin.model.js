const mongoose = require("mongoose");

const roles = ["user", "admin"];

/**
 * Bitcoin details Schema
 * @private
 */

const bitcoinSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    rates: {
      little: { type: Number, required: true, },
      meduim: { type: Number, required: true, },
      large: { type: Number, required: true, },
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

module.exports = mongoose.model("bitcoin", bitcoinSchema);
