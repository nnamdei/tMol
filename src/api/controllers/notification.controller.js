const httpStatus = require("http-status");
const { getFcmTokens, sendToDevice } = require('../services/firebaseMessage')
exports.sendNotification = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const data = { title, content };
    if (data) {
      let usersFcmTokens = await getFcmTokens('user')
      if (usersFcmTokens.length != 0) {
        await sendToDevice(usersFcmTokens, data, 'user')
      }
      return res.status(httpStatus.CREATED).json({
        message: "Notification sent",
        data,
        usersFcmTokens,
      });
    }
    throw new Error("Unsuccessful");
  } catch (error) {
    return next(error);
  }
};
