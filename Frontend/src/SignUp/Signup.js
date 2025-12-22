import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Footer from "../HomePage/Footer";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(120);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!loading) {
      setSecondsLeft(120);
      return;
    }
    if (secondsLeft === 0) return;

    const id = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [loading, secondsLeft]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    let hasError = false;

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include upper & lower case letters, a number and a special character."
      );
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
        { email, password }
      );
      setMessage("✅ Signup successful!");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        color="default"
        sx={{
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* header content */}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
          p: 2,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            borderRadius: 3,
            textAlign: "center",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Avatar same style as Login */}
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#1976d2",
              color: "#e3f2fd",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              position: "absolute",
              top: -40,
              left: "50%",
              transform: "translateX(-50%)",
              border: "3px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: 46 }} />
          </Avatar>

          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: "primary.main",
              }}
            >
              Create an Account
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 3, color: "text.secondary" }}
            >
              Sign up to get started with Moak
            </Typography>

            <form onSubmit={handleSignup}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                error={!!emailError}
                helperText={
                  emailError ||
                  "Enter a valid email, e.g. user@example.com"
                }
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 1 }}
                error={!!passwordError}
                helperText={
                  passwordError ||
                  "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character."
                }
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.2, fontWeight: "bold", borderRadius: 2, mt: 2 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={20}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    {secondsLeft}s
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            {message && (
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: message.includes("✅") ? "green" : "red",
                }}
              >
                {message}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
      <Footer />
    </>
  );
}
