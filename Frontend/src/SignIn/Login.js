import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (!loading) {
      setSecondsLeft(60);
      return;
    }
    if (secondsLeft === 0) return;

    const id = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [loading, secondsLeft]);

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    // ✅ 1st API: Login (email/password verify)
    const loginRes = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      { email, password }
    );

    console.log("Login response:", loginRes.data);

    // ✅ Store session cookies
    // Cookies.set("pendingEmail", loginRes.data.email, { expires: 1 / 24 / 60 });
    // Cookies.set("pendingUserId", loginRes.data.userId || loginRes.data.id, { expires: 1 / 24 / 60 });
    // Cookies.set("otpSessionTime", Date.now().toString(), { expires: 1 / 24 / 60 });

    // ✅ 2nd API: Send OTP (only if login successful)
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/send-otp`,
        { email: loginRes.data.email }
      );
      
      setMessage("✅ OTP sent to your email! Redirecting...");
      setEmail("");
      setPassword("");

      // Auto redirect to OTP
      setTimeout(() => {
        // navigate("/otp-verify");
        navigate(`/otp-verify/${btoa(email)}`); // Base64 encode
      }, 1500);

    } catch (otpErr) {
      console.error("OTP send error:", otpErr.response?.data);
      setMessage("❌ Login successful but OTP send failed. Please try again.");
    }

  } catch (loginErr) {
    console.error("Login error:", loginErr.response?.data);
    setMessage(loginErr.response?.data?.error || "❌ Invalid credentials");
  } finally {
    setLoading(false);
  }
};

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #42a5f5 0%, #478ed1 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          textAlign: "center",
          position: "relative",
          overflow: "visible",
        }}
      >
        <Avatar
          sx={{
            width: 88,
            height: 88,
            background:
              "radial-gradient(circle at 30% 20%, #64b5f6 0%, #1565c0 40%, #0d47a1 100%)",
            color: "#e3f2fd",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            position: "absolute",
            top: -44,
            left: "50%",
            transform: "translateX(-50%)",
            border: "3px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PersonOutlineIcon
            sx={{
              fontSize: 48,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
          />
        </Avatar>

        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 1.5, color: "primary.main" }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Enter credentials to receive OTP
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.2,
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(25, 118, 210, 0.4)",
                ":hover": {
                  boxShadow: "0 6px 20px rgba(25, 118, 210, 0.55)",
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  {secondsLeft}s
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>

          {message && (
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                color: message.includes("✅") ? "green" : "red",
                fontWeight: 500,
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
