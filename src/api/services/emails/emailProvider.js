/* eslint-disable arrow-parens */
const nodemailer = require("nodemailer");
const { emailConfig } = require("../../../config/vars");
const Email = require("email-templates");

// SMTP is the main transport in Nodemailer for delivering messages.
// SMTP is also the protocol used between almost all email hosts, so its truly universal.
// if you dont want to use SMTP you can create your own transport here
// such as an email service API or nodemailer-sendgrid-transport

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: emailConfig.username,
    refreshToken: emailConfig.refreshToken,
    accessToken: emailConfig.accessToken,
    clientId: emailConfig.clientID,
    clientSecret: emailConfig.clientSecret,
  },
});

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email successful");
  }
});

exports.sendWelcomeEmail = async (user) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: "support@truthx.com",
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: "welcomeMessage",
      message: {
        to: user.email,
      },
      locals: {
        productName: "TruthX",
        name: user.name,
      },
    })
    .catch(() => console.log("error sending welcome message email"));
};

exports.sendPasswordReset = async (updated, code) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: "support@truthx.com",
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: "passwordReset",
      message: {
        to: updated.email,
      },
      locals: {
        productName: "TruthX",
        name: updated.name,
        code,
      },
    })
    .catch((err) => console.log("error sending password reset email", err));
};

// Send password change email after changing password
exports.sendPasswordChangeEmail = async (user) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: "support@truthx.com",
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: "passwordChange",
      message: {
        to: user.email,
      },
      locals: {
        productName: "TruthX",
        name: user.name,
      },
    })
    .catch(() => console.log("error sending change password email"));
};
