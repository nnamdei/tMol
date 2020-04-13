const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/user.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const { listRate, createRate } = require("../../validations/rate.validation");

const router = express.Router();

router
  .route("/")
  /**
   * @api {get} v1/admin/rate List Rates
   * @apiDescription Get a list of rates
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
  .get(authorize(ADMIN), validate(listRate), controller.list);

/**
 * @api {post} v1/admin/users Create User
 * @apiDescription Create a new user
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {String}             email     User's email
 * @apiParam  {String{6..128}}     password  User's password
 * @apiParam  {String{..128}}      [name]    User's name
 * @apiParam  {String=user,admin}  [role]    User's role
 *
 * @apiSuccess (Created 201) {String}  id         User's id
 * @apiSuccess (Created 201) {String}  name       User's name
 * @apiSuccess (Created 201) {String}  email      User's email
 * @apiSuccess (Created 201) {String}  role       User's role
 * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
 */
router
  .route("/")
  .post(authorize(ADMIN), validate(createRate), controller.create);

module.exports = router;
