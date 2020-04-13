const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const rateRoutes = require("./rate.route");

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
router.use("/admin/rates", rateRoutes);
router.use("/auth", authRoutes);

module.exports = router;
