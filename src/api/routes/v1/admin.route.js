const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/admin.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const { listUsers, createUser } = require("../../validations/user.validation");

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param("userId", controller.load);

router
  .route("/user")
  .get(authorize(ADMIN), validate(listUsers), controller.listUsers)
  .post(authorize(ADMIN), validate(createUser), controller.createUser);

router.route("/user/:id").delete(authorize(ADMIN), controller.removeUser);

router.route("/profile").patch(authorize(ADMIN), controller.updateUser);

router.route("/transaction").get(authorize(ADMIN), controller.listTransanction);
router
  .route("/transaction/accept")
  .patch(authorize(ADMIN), controller.approveTransaction);
router
  .route("/transaction/reject")
  .patch(authorize(ADMIN), controller.rejectTransaction);
module.exports = router;
