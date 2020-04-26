/* eslint-disable indent */
const express = require("express");
const controller = require("../../controllers/bitcoin.controller");
const { authorize, ADMIN } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(authorize(ADMIN), controller.get)
  .post(authorize(ADMIN), controller.create);

router.route("/:id").delete(authorize(ADMIN), controller.delete);

module.exports = router;