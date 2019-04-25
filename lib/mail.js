const nodemailer = require('nodemailer');
import dotenv from 'dotenv';
dotenv.config()

class Mail {
  constructor() {

  }

  initialize(){
    let smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
          XOAuth2: {
            user: "xxx@gmail.com", // Your gmail address.
            clientId: process.env.YOUR_CLIENT_ID,
            clientSecret: process.env.YOUR_CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN_YOU_JUST_FOUND
          }
        }
      });
  }

  send(to, subject, text, html ){

  }


}
