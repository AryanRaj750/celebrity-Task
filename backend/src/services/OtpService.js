import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, SMS_FROM_NUMBER, EMAIL_USERNAME, EMAIL_PASSWORD, HASH_SECRET } from '../config';
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USERNAME, // generated ethereal user
    pass: EMAIL_PASSWORD, // generated ethereal password
  },
});
const message = (otp) => {
  return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Celebrity School</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing >Celebrity School. Use the following OTP to complete your Sign Up procedures. <b>OTP</b> is valid for <b>10</b> minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><b>${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br/>Celebrity School</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>>Celebrity School Inc</p>
        <p>1600 Amphitheatre Parkway</p>
        <p>India</p>
      </div>
    </div>
  </div> </b>
    `
}
class OtpService {
  static generateOtp() {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
  }

  static async sendOtpToPhone(phoneNo, otp) {
    return await twilio.messages.create(
      {
        to: phoneNo,
        from: SMS_FROM_NUMBER,
        body: `your  Celebrity School one time password(otp) is ${otp}`,
      }
    )
  }

  static async sendOtpToEmail(email, otp) {
    return await transporter.sendMail({
      from: '"Celebrity School 👻" <EMAIL_USERNAME>',
      to: email,
      subject: "One Time Password ✔",
      text: "upcloud team",
      html: message(otp)
    });
  }
  static verifyOtp(dbOtp, userOtp) {
    return dbOtp === userOtp
  }

  static generateHashData(contact, otp){
    const ttl = 1000 * 60 * 2;
    const expires = Date.now() + ttl;
    const data = `${phoneNo}.${otp}.${expires}`
  }

  static hashOtp(data) {
    return crypto
      .createHmac('sha256', HASH_SECRET)
      .update(data)
      .digest('hex');
  }
}

export default OtpService;