/* eslint-disable indent */
const express = require("express");
const controller = require("../../controllers/giftcard.controller");
const { authorize, LOGGED_USER, ADMIN } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  /**
   * @api {get} v1/
   * @apiDescription
   * @apiVersion 1.0.0
   * @apiName ListUsers
   * @apiGroup Rate
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   * @apiParam  {String}             [name]       User's name
   * @apiParam  {String}             [email]      User's email
   * @apiParam  {String=user,admin}  [role]       User's role
   *
   * @apiSuccess {Object[]} users List of users.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */

  .get(controller.getAll)

  .post(authorize(ADMIN), controller.create);

router.route("/:id").delete(authorize(ADMIN), controller.delete);

module.exports = router;
