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
    rates: [
      {
        smallest: { type: Number },
        small: { type: Number },
        meduim: { type: Number },
        large: { type: Number },
        larger: { type: Number },
        largest: { type: Number },
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

module.exports = mongoose.model("bitcoin", bitcoinSchema);
