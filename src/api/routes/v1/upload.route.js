/* eslint-disable indent */
const express = require("express");
const middleware = require("../../middlewares/multerUploads");
const service = require("../../services/uploadProvider");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/transaction")
  /**
   * @api {get} v1/image Upload image for transaction
   * @apiDescription Upload image
   * @apiVersion 1.0.0
   * @apiName ListUsers
   * @apiGroup Rate
   * @apiPermission admin
   */
  .post(
    authorize(LOGGED_USER),
    middleware.parser.array("file", 5),
    service.uploadTransactionImage
  );

router
  .route("/transaction/remark")
  .post(
    authorize(ADMIN),
    middleware.parser.single("file"),
    service.uploadRemarkImage
  );

router
  .route("/user")
  /**
   * @api {get} v1/image Upload image for User
   * @apiDescription Upload image
   * @apiVersion 1.0.0
   * @apiPermission user
   */
  .patch(
    authorize(LOGGED_USER),
    middleware.parser.single("file"),
    service.uploadUserImage
  );

module.exports = router;
