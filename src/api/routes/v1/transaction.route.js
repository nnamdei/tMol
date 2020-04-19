/* eslint-disable indent */
const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/transaction.controller");
const { authorize, LOGGED_USER } = require("../../middlewares/auth");
//const { validateGiftCard } = require("../../validations/giftcard.validation");

const router = express.Router();

router
  .route("/")
  /**
   * @api {get} v1/giftcard/ Selling Giftcard
   * @apiDescription To sell a Giftcard
   * @apiVersion 1.0.0
   * @apiName SellGiftcard
   * @apiGroup Giftcard
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Object[]} Giftcard details.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   */
  .post(authorize(LOGGED_USER), controller.create);

router.get("/", authorize(LOGGED_USER), controller.list);

module.exports = router;
