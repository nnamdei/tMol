/**
 *  THIS HAS NOT BEEN SETUP COMPLETELY AS 
 *  THE DEPENDENCY IS YET TO BE ADDED TO THE APP
 *  @file   [truthx-63f51-firebase-adminsdk-4b5vq-ecd5597b4f.json]
 * 
 *  IS YET TO BE ADDED ALSO
 */

const admin = require('firebase-admin');

var serviceAccount = require("../key/truthx-63f51-firebase-adminsdk-4b5vq-ecd5597b4f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const fcm = admin.messaging();
/**
 * @param {String} token - The token
 * @param {Map} payload - The payload
 * @argument payload ={   transactionType,  name}
 */
exports.sendToDevice = async (token, payload) => {


  const fcmPayload = {
    notification: {
      title: `New ${payload.transactionType} Order!`,
      body: `You have a new order Form ${payload.name}. `,
      icon: 'your-icon-url',
      click_action: 'FLUTTER_NOTIFICATION_CLICK'
    }
  };

  return fcm.sendToDevice(token, fcmPayload);

}


