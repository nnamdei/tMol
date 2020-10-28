const httpStatus = require("http-status");
const FcmToken = require("../models/fcmToken.model");
const { getFcmTokens, sendToDevice } = require("../services/firebaseMessage");

exports.sendNotification = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const data = { title, content };
    if (data) {
      let { firstList, secondList } = await getFcmTokens();
      console.log(firstList);
      if (firstList.length != 0) {
        await sendToDevice(firstList, data);
      }

      if (secondList.length != 0) {
        await sendToDevice(secondList, data);
      }
      return res.status(httpStatus.CREATED).json({
        message: "Notification sent",
        data,
        firstList,
        secondList,
      });
    }
    throw new Error("Unsuccessful");
  } catch (error) {
    return next(error);
  }
};

exports.sendNotificationToAdmin = async (body, userId) => {
  try {
    const user = await FcmToken.findOne({ userId });
    console.log(user);
    // console.log(vendor, 'Vendor');
    // const body = { title: "New Trade!", content: "Check pending trades!" };
    const fcmToken = user.fcmtoken;
    // console.log(fcmToken);
    fcmToken === null
      ? console.log("No fcmToken")
      : sendToDevice(fcmToken, body, "user");
  } catch (error) {
    console.error(error, "Notification error");
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Notification not sent"
    );
  }
};
