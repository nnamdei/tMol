const httpStatus = require("http-status");
const FcmToken = require("../models/fcmToken.model");

// Save token to db

exports.create = async (req, res, next) => {
  try {
    const { fcmtoken } = req.body;
    const fcmToken = new FcmToken({
      userId: req.user._id,
      fcmtoken,
    });
    console.log(req);

    const newFcmToken = await fcmToken.save();
    if (newFcmToken) {
      return res.status(httpStatus.CREATED).json({
        message: "Token saved",
        newFcmToken,
      });
    }
    throw new Error("Unsuccessful");
  } catch (error) {
    return next(error);
  }
};
