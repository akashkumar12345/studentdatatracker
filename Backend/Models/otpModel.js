const pool = require('../Config/db');

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || '5', 10);

// latest OTP create
async function createOtp({ userId, otpHash, channel, ipAddress, userAgent }) {
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const result = await pool.query(
    `INSERT INTO otp_codes
       (user_id, otp_hash, channel, expires_at, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, otpHash, channel, expiresAt, ipAddress || null, userAgent || null]
  );

  return result.rows[0];
}

// user ke लिए latest OTP record
async function getLatestOtpForUser(userId) {
  const result = await pool.query(
    `SELECT * FROM otp_codes
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT 1`,
    [userId]
  );
  return result.rows[0];
}

// attempts +1
async function incrementOtpAttempts(id) {
  await pool.query(
    `UPDATE otp_codes
     SET attempts = attempts + 1
     WHERE id = $1`,
    [id]
  );
}

// used flag set
async function markOtpUsed(id) {
  await pool.query(
    `UPDATE otp_codes
     SET used = TRUE
     WHERE id = $1`,
    [id]
  );
}

// optional: expired codes cleanup (cron se call kar sakta hai)
async function deleteExpiredOtps() {
  await pool.query(
    `DELETE FROM otp_codes
     WHERE expires_at < NOW()`
  );
}

module.exports = {
  createOtp,
  getLatestOtpForUser,
  incrementOtpAttempts,
  markOtpUsed,
  deleteExpiredOtps,
};