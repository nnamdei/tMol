/* eslint-disable indent */
const express = require("express");
const controller = require("../../controllers/notification.controller");
const { authorize, ADMIN } = require("../../middlewares/auth");

const router = express.Router();

router.route("/").post(authorize(ADMIN), controller.sendNotification);
router.route("/trade").post(controller.sendNotificationToAdmin);

module.exports = router;
