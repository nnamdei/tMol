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
 * User Roles
 */
const roles = ["user", "admin"];

/**
 * Rates Schema
 * @private
 */

const bitcoinSchema = new mongoose.Schema(
  {
    account: [
      {
        type: String,
        required: true,
      },
    ],
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
