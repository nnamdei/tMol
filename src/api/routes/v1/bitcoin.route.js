/* eslint-disable indent */
const express = require("express");
const controller = require("../../controllers/bitcoin.controller");
const { authorize, ADMIN } = require("../../middlewares/auth");

const router = express.Router();

router.route("/").get(controller.get).post(authorize(ADMIN), controller.create);

router.route("/:id").patch(authorize(ADMIN), controller.update);

router.route("/:id").delete(authorize(ADMIN), controller.delete);

module.exports = router;
