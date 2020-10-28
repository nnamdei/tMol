require("dotenv-safe");
const FcmToken = require("../models/fcmToken.model");
const User = require("../models/user.model");
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const fcm = admin.messaging();
/**
 * @param {String} token - The token
 * @param {Map} payload - The payload
 * @argument payload ={   transactionType,  name}
 */
exports.sendToDevice = async (token, payload, ROLE) => {
  let fcmPayload;
  if (ROLE == "user") {
    fcmPayload = {
      notification: {
        title: `${payload.title}`,
        body: ` ${payload.content}. `,
        icon: "your-icon-url",
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },
    };
  } else {
    fcmPayload = {
      notification: {
        title: `${payload.title}`,
        body: ` ${payload.content}. `,
        icon: "your-icon-url",
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },
    };
  }

  return await fcm.sendToDevice(token, fcmPayload);
};

exports.getFcmTokens = async (ROLE) => {
  const firstList = [];
  const secondList = [];

  const foundFcmTokens = await FcmToken.find().populate("userId");
  //  console.log(foundFcmTokens);
  //const filterList = foundFcmTokens.filter(data => data.userId.role === ROLE  || data.userId.role == null);

  foundFcmTokens.slice(0, 1000).forEach((item) => {
    firstList.push(item.fcmtoken);
  });

  foundFcmTokens.slice(1, 1000).forEach((item) => {
    secondList.push(item.fcmtoken);
  });
  return { firstList, secondList };
};

exports.sendNotificationToAdmin = async (body, userId) => {
  try {
    const user = await FcmToken.findOne({ userId });
    console.log(user);
    // console.log(vendor, 'Vendor');
    // const body = { title: "New Trade!", content: "Check pending trades!" };
    const fcmToken = user.fcmtoken;
    console.log(fcmToken);
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

// module.exports = { sendToDevice };
