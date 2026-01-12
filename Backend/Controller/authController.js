// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { createUser, findUserByEmail } = require('../Models/userModel');

// const signup = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await createUser(email, hashedPassword);
//     res.status(201).json({ message: 'User created', user });
//   } catch (err) {
//     if (err.code === '23505') {
//       res.status(400).json({ error: 'Email already exists' });
//     } else {
//       res.status(500).json({ error: err.message });
//     }
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await findUserByEmail(email);
//     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       // { expiresIn: '1min' }
//     );
//     res.json({ token, userId: user.id, email: user.email });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = {
//   signup,
//   login,
// };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { createUser, findUserByEmail } = require('../Models/userModel');
const {
  createOtp,
  getLatestOtpForUser,
  incrementOtpAttempts,
  markOtpUsed,
} = require('../Models/otpModel');
const { sendOtpEmail } = require('../Middleware/sendOtpEmail');

const MAX_OTP_ATTEMPTS = 5;

// helper: 6‑digit OTP
function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// helper: hash OTP (no plain store)
function hashOtp(otp) {
  const secretSalt = process.env.OTP_SALT || 'some_random_salt_string';
  return crypto.createHash('sha256').update(otp + secretSalt).digest('hex');
}

// SIGNUP (without OTP verify logic yet)
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);

    // Optionally: yahi par verification OTP bhejna hai
    // await sendOtpDuringSignup(user, req);

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN (password check only, OTP 2FA optional)
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: 'Invalid credentials' });
    res.json({ userId: user.id, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------- OTP endpoints -------------

// POST /auth/send-otp  (signup verify, forgot password, or 2FA)
const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'User not found for this email' });
    }

    // Rate limiting: per user latest OTP check
    const latest = await getLatestOtpForUser(user.id);
    if (latest && latest.expires_at > new Date()) {
      // still valid OTP present – optional: block or just resend same
      return res
        .status(429)
        .json({ error: 'OTP already sent. Please wait before requesting again.' });
    }

    const otp = generateOtp();
    const otpHash = hashOtp(otp);

    await createOtp({
      userId: user.id,
      otpHash,
      channel: 'email',
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    await sendOtpEmail(user.email, otp);

    res.json({ message: 'OTP sent to your email.' });
  } catch (err) {
    console.error('sendOtp error', err);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// POST /auth/verify-otp
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const record = await getLatestOtpForUser(user.id);
    if (!record) {
      return res.status(400).json({ error: 'No OTP found. Please request a new one.' });
    }

    if (record.used) {
      return res.status(400).json({ error: 'OTP already used. Request a new one.' });
    }

    if (record.expires_at < new Date()) {
      return res.status(400).json({ error: 'OTP has expired. Request a new one.' });
    }

    if (record.attempts >= MAX_OTP_ATTEMPTS) {
      return res.status(400).json({ error: 'Too many failed attempts. Request a new OTP.' });
    }

    const otpHash = hashOtp(otp);

    if (otpHash !== record.otp_hash) {
      await incrementOtpAttempts(record.id);
      return res.status(400).json({ error: 'Incorrect OTP' });
    }

    // success
    await markOtpUsed(record.id);
    // yaha jo purpose hai wo karo:
    // - signup verify: user table me isVerified = true set karo (agar column hai)
    // - login 2FA: final JWT issue karo

    // const token = jwt.sign(
    //   { userId: user.id, email: user.email },
    //   process.env.JWT_SECRET
    // );
    // yaha decide karo: direct JWT de ya OTP 2FA enable ho to pehle OTP bhejo
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET
      // { expiresIn: '1h' }
    );

    res.json({ message: 'OTP verified', token });
  } catch (err) {
    console.error('verifyOtp error', err);
    res.status(500).json({ error: 'OTP verification failed' });
  }
};

module.exports = {
  signup,
  login,
  sendOtp,
  verifyOtp,
};
