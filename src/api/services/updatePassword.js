const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const APIError = require("../utils/APIError");
const httpStatus = require("http-status");
const { env } = require("../../config/vars");

exports.updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { _id } = req.user;

  try {
    const foundUser = await User.findById(_id);
    if (foundUser) {
      let { password } = foundUser;
      console.log("Old password:", password);

      const response = await bcrypt.compare(oldPassword, password);
      console.log("Response:", response);
      if (response) {
        const rounds = env === "test" ? 1 : 10;

        const hash = await bcrypt.hash(newPassword, rounds);
        password = hash;
        console.log("New password:", password);

        const updated = await User.findByIdAndUpdate(
          { _id },
          { $set: { password } },
          { new: true }
        );
        if (updated) {
          res.status(httpStatus.OK);
          return res.json({
            message: "Password updated",
            updated,
          });
        }
      }
      throw new APIError({
        status: httpStatus.NOT_IMPLEMENTED,
        message: "Unable to change password",
      });
    }
    throw new APIError({
      status: httpStatus.NOT_FOUND,
      message: "Account not found",
    });
  } catch (error) {
    return next(error);
  }
};
