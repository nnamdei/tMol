/* eslint-disable indent */
const express = require("express");
const controller = require("../../controllers/subcategory.transaction");
const { authorize, ADMIN } = require("../../middlewares/auth");

const router = express.Router();

router.route("/").post(authorize(ADMIN), controller.create);

module.exports = router;
