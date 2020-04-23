/* eslint-disable indent */
const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/transaction.controller");
const { authorize, LOGGED_USER } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  /**
   * @api {get} v1/
   * @apiDescription
   * @apiVersion 1.0.0
   * @apiName
   * @apiGroup
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Object[]}
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   */
  .post(authorize(LOGGED_USER), controller.create)
  .get(authorize(LOGGED_USER), controller.list);

module.exports = router;
