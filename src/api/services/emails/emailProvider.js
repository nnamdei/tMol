const nodemailer = require("nodemailer");
const { emailConfig } = require("../../../config/vars");
const Email = require("email-templates");

// SMTP is the main transport in Nodemailer for delivering messages.
// SMTP is also the protocol used between almost all email hosts, so its truly universal.
// if you dont want to use SMTP you can create your own transport here
// such as an email service API or nodemailer-sendgrid-transport

const transporter = nodemailer.createTransport({
  port: emailConfig.port,
  host: emailConfig.host,
  auth: {
    user: emailConfig.username,
    pass: emailConfig.password,
  },
  secure: false, // upgrades later with STARTTLS -- change this based on the PORT
});

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log("Error with email connection", error);
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

exports.sendPasswordReset = async (user, code) => {
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
        to: user.email,
      },
      locals: {
        productName: "TruthX",
        name: user.name,
        code,
      },
    })
    .catch(() => console.log("error sending password reset email"));
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
