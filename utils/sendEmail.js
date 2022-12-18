
const sg = require("@sendgrid/mail");
require("dotenv").config();

sg.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = (body) => {
  sg.send({
    to: body.email,
    from: process.env.SENDER_EMAIL_ADDRESS,
    subject: "Welcome to SDG WebApp",
    text: `Hello ${body.name}, \n\n Welcome to SDG WebApp. Please confirm the email address for your account on SDG WebApp by entering the 6-digit code below. \n\n 6-digit code: ${body.confirmation_code}`
  });
};

module.exports = { sendConfirmationEmail };
