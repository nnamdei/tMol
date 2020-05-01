const httpStatus = require("http-status");

exports.sendNotification = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const data = { title, content };
    if (data) {
      return res.status(httpStatus.CREATED).json({
        message: "Notification sent",
        data,
      });
    }
    throw new Error("Unsuccessful");
  } catch (error) {
    return next(error);
  }
};
