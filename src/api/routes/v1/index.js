const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const rateRoutes = require("./rate.route");
const transactionRoutes = require("./transaction.route");
const uploadRoute = require("./upload.route");
const giftcardRoute = require("./giftcard.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/admin/users", userRoutes);
router.use("/admin/giftcard", giftcardRoute);
router.use("/rates", rateRoutes);
router.use("/auth", authRoutes);
router.use("/transaction", transactionRoutes);
router.use("/image", uploadRoute);

module.exports = router;
