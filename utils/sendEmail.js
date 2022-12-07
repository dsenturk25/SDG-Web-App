
const sg = require("@sendgrid/mail");
require("dotenv").config();

sg.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = (email) => {
  sg.send({
    to: email,
    from: process.env.SENDER_EMAIL_ADDRESS,
    subject: "Welcome to SDG WebApp",
    text: `Hello, welcome. Nice to meet you!`
  });
};

module.exports = { sendConfirmationEmail };
