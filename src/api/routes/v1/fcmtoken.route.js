/* eslint-disable indent */
const express = require("express");
const controller = require("../../controllers/fcmtoken.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");

const router = express.Router();

router.route("/").post(authorize(LOGGED_USER), controller.create);

module.exports = router;
