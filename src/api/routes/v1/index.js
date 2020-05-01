const express = require("express");
const adminRoutes = require("./admin.route");
const authRoutes = require("./auth.route");
const rateRoutes = require("./rate.route");
const transactionRoutes = require("./transaction.route");
const uploadRoute = require("./upload.route");
const giftcardRoute = require("./giftcard.route");
const bitcoinRoute = require("./bitcoin.route");
const fcmtokenRoute = require("./fcmtoken.route");
const notificationRoute = require("./notification.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));
router.get("/tokenStatus", (req, res) => res.send("OK"));

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/admin", adminRoutes);
router.use("/giftcard", giftcardRoute);
router.use("/bitcoin", bitcoinRoute);
router.use("/rates", rateRoutes);
router.use("/auth", authRoutes);
router.use("/transaction", transactionRoutes);
router.use("/image", uploadRoute);
router.use("/fcmtoken", fcmtokenRoute);
router.use("/notification", notificationRoute);

module.exports = router;
