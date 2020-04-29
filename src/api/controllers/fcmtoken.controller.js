const httpStatus = require("http-status");
const FcmToken = require("../models/fcmToken.model");
var mongoose = require('mongoose');
// Save token to db

exports.create = async (req, res, next) => {
  try {
    const { fcmtoken, userId } = req.body;
    let _id = mongoose.Types.ObjectId(userId)
    let foundFcmtoken = await FcmToken.findOne({ userId: _id });

    if (!foundFcmtoken) {
      const fcmToken = new FcmToken({
        userId: _id,
        fcmtoken,
      });

      await fcmToken.save();
      return res.status(httpStatus.CREATED).json({
        message: "Token Saved",
      });

    }
    if (foundFcmtoken && foundFcmtoken.fcmtoken == fcmtoken) {
      return res.status(httpStatus.OK).json({
        message: "Token Still Active",
      });
    }
    if (foundFcmtoken && foundFcmtoken.fcmtoken !== fcmtoken) {
      await foundFcmtoken.updateOne({ fcmtoken }, { new: true })
      return res.status(httpStatus.CREATED).json({
        message: "Token Updated",
      });
    }
    throw new Error("Unsuccessful");
  } catch (error) {
    return next(error);
  }
};
