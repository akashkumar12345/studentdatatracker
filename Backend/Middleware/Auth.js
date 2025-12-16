const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"]; // frontend will send:  Authorization: Bearer <token>
console.log("token",token);
  if (!token) {
    return res.status(401).json({ error: "Token not present" });
  }

  try {
    const actualToken = token.split(" ")[1]; // Extract real token
    console.log("request",actualToken);
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    console.log("decode",decoded);
    req.user = decoded; // save user data for next controller
    // console.log("req",req.user)
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
