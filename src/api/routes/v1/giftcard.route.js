/* eslint-disable indent */
const express = require("express");
const controller = require("../../controllers/giftcard.controller");
const { authorize, LOGGED_USER, ADMIN } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")

  .get(controller.getAll)

  .post(authorize(ADMIN), controller.create);

router.route("/:id").patch(authorize(ADMIN), controller.available);
router.route("/:id").put(authorize(ADMIN), controller.whatsapp);
router.route("/:id").delete(authorize(ADMIN), controller.delete);

module.exports = router;
