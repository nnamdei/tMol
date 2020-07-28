const mongoose = require("mongoose");

const cardCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: String,
    default: true,
  },
  card: { type: mongoose.Schema.ObjectId, ref: "Giftcard" },
});

module.exports = mongoose.model("CardCategory", cardCategorySchema);
