const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/user.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const { listUsers, createUser } = require("../../validations/user.validation");

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param("userId", controller.load);

router
  .route("/")
  .get(authorize(ADMIN), validate(listUsers), controller.list)
  .post(authorize(ADMIN), validate(createUser), controller.create);

router.route("/:id").delete(authorize(ADMIN), controller.remove);

router.route("/profile").patch(authorize(LOGGED_USER), controller.update);

module.exports = router;
