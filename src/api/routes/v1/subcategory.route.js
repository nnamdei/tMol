/* eslint-disable indent */
const express = require("express");
const controller = require("../../controllers/subcategory.transaction");
const { authorize, ADMIN } = require("../../middlewares/auth");

const router = express.Router();

router.route("/").post(authorize(ADMIN), controller.create);
router.route("/").patch(authorize(ADMIN), controller.update);
router.route("/:id").patch(authorize(ADMIN), controller.available);

module.exports = router;
