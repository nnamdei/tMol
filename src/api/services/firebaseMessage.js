require("dotenv-safe");
const FcmToken = require("../models/fcmToken.model");
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
exports.sendToAdminDevice = async (token, payload) => {
  const fcmPayload = {
    notification: {
      title: `New ${payload.transactionType} Order!`,
      body: `You have a new order Form ${payload.name}. `,
      icon: "your-icon-url",
      click_action: "FLUTTER_NOTIFICATION_CLICK",
    },
  };
  return fcm.sendToDevice(token, fcmPayload);
};

exports.getFcmTokens = async (ROLE) => {
  let finalList = [];
  let foundFcmTokens = await FcmToken.find().populate("userId");
  let filterList = foundFcmTokens.filter((data) => {
    return data.userId.role === ROLE;
  });
  filterList.forEach((item) => {
    finalList.push(item.fcmtoken);
  });
  return finalList;
};
