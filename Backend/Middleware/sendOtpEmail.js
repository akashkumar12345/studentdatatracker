// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT || 587),
//   secure: false, // 587 = TLS
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
//     tls: {
//     rejectUnauthorized: false,
//   },
// });

// async function sendOtpEmail(to, otp) {
//   const mailOptions = {
//     from: process.env.FROM_EMAIL,
//     to,
//     subject: 'Your Moak verification code',
//     text: `Your verification code is ${otp}. It is valid for ${process.env.OTP_EXPIRY_MINUTES || 5} minutes. Do not share this code with anyone.`,
//     html: `
//       <p>Hi,</p>
//       <p>Your <strong>Moak</strong> verification code is:</p>
//       <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
//       <p>This code will expire in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.</p>
//       <p>If you did not request this, you can safely ignore this email.</p>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// }
// module.exports = { sendOtpEmail };

// New file: middleware/brevoApi.js
const axios = require('axios');
async function sendOtpEmail(to, otp) {
  try {
    await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { 
        name: 'Moak', 
        email: process.env.FROM_EMAIL  // ✅ Ye ab simple email hoga
      },
      to: [{ email: to }],
      subject: 'Your Moak verification code',
      htmlContent: `
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

      <p style="font-size: 16px; color: #333;">
        Hi,
      </p>

      <p style="font-size: 16px; color: #333;">
        Your <strong>Moak</strong> verification code is:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="
          display: inline-block;
          font-size: 36px;
          font-weight: bold;
          color: #007bff;
          letter-spacing: 6px;
          padding: 12px 24px;
          border: 1px dashed #007bff;
          border-radius: 6px;
        ">
          ${otp}
        </span>
      </div>

      <p style="font-size: 14px; color: #555;">
        This code is valid for <strong>5 minutes</strong>.  
        Please do not share this code with anyone.
      </p>

      <p style="font-size: 14px; color: #777; margin-top: 30px;">
        If you did not request this, please ignore this email.
      </p>

      <p style="font-size: 14px; color: #777;">
        Regards,<br />
        <strong>Moak Team</strong>
      </p>

    </div>
  </body>
</html>

      `,
    }, {
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
    });
    console.log('✅ Email sent!');
  } catch (error) {
    console.error('Brevo API error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { sendOtpEmail };