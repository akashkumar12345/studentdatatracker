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
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        { email, password }
      );

      Cookies.set("token", res.data.token);
      setMessage("✅ Login successful!");
      setEmail("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Login failed");
      alert("invalid credentials");
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
        background: "linear-gradient(135deg, #42a5f5 0%, #478ed1 100%)", // same as before
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
        {/* Avatar with professional icon */}
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
            sx={{ fontWeight: "bold", mb: 1.5, color: "primary.main" }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Log in to continue using Moak
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
                "Log In"
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
