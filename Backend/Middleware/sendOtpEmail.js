const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // 587 = TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
    tls: {
    rejectUnauthorized: false,
  },
});

async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Your Moak verification code',
    text: `Your verification code is ${otp}. It is valid for ${process.env.OTP_EXPIRY_MINUTES || 5} minutes. Do not share this code with anyone.`,
    html: `
      <p>Hi,</p>
      <p>Your <strong>Moak</strong> verification code is:</p>
      <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
      <p>This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
module.exports = { sendOtpEmail };