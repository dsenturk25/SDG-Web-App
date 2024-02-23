
const sg = require("@sendgrid/mail");
require("dotenv").config();

sg.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = (body) => {
  sg.send({
    to: body.email,
    from: process.env.SENDER_EMAIL_ADDRESS,
    subject: "Confirm Your Account",
    content: [
      {
        type: "text/html",
        value: `<p>Hello ${body.name}, <br/><br/> Welcome on board! Please confirm the email address for your account on Sustainability Hub. <br/><br/> Email Confirmation Code: ${body.confirmation_code}</p>`
      }
    ],
  });
};

module.exports = { sendConfirmationEmail };
