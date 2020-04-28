const mongoose = require("mongoose");

const roles = ["user", "admin"];

/**
 * Bitcoin details Schema
 * @private
 */

const bitcoinSchema = new mongoose.Schema(
  {
    account:
    {
      type: String,
      required: true,
    },

    rate: {
      type: String,
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

module.exports = mongoose.model("bitcoin", bitcoinSchema);
