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
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  // countdown jab loading true ho
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
        background: "linear-gradient(135deg, #42a5f5 0%, #478ed1 100%)",
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
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
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
            sx={{ py: 1.2, fontWeight: "bold", borderRadius: 2 }}
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
            sx={{ mt: 2, color: message.includes("✅") ? "green" : "red" }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
