
const sg = require("@sendgrid/mail");
require("dotenv").config();

sg.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = (body) => {
  sg.send({
    to: body.email,
    from: process.env.SENDER_EMAIL_ADDRESS,
    subject: "Welcome to SDG WebApp",
    content: [
      {
        type: "text/html",
        value: `<p>Hello ${body.name}, <br/><br/> Welcome on board! Please confirm the email address for your account on SDG WebApp by entering the 6-digit code below. <br/><br/> 6-digit code: ${body.confirmation_code} <br><br> Thank you for your interest on our app. Please don't forget to recomment this app to your friends</p> <br/><br/> <div><img width="20px" height="20px" src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png"/><img width="20px" height="20px" src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png"/></div>`
      }
    ],
  });
};

module.exports = { sendConfirmationEmail };
