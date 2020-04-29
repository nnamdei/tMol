const mongoose = require("mongoose");
/**
 * Refresh Token Schema
 * @private
 */
const fcmToken = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fcmtoken: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("fcmToken", fcmToken);
