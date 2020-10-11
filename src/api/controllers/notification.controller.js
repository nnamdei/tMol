const httpStatus = require("http-status");
const { getFcmTokens, sendToDevice } = require('../services/firebaseMessage')


exports.sendNotification = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const data = { title, content };
    if (data) {
      let { firstList, secondList } = await getFcmTokens()
      
      if (firstList.length != 0) {
        await sendToDevice(firstList, data)
      }
      
      if (secondList.length != 0) {
        await sendToDevice(secondList, data)
      }
      return res.status(httpStatus.CREATED).json({
        message: "Notification sent",
        data,
        firstList,
        secondList
      });
    }
    throw new Error("Unsuccessful");
  } catch (error) {
    return next(error);
  }
};
