// Signup.js
// import React, { useState } from 'react';
// import axios from 'axios';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
//       setMessage('Signup successful!');
//     } catch (err) {
//       setMessage(err.response?.data.error || 'Signup failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" />
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
//       <button type="submit">Sign Up</button>
//       {message && <p>{message}</p>}
//     </form>
//   );
// }

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
} from "@mui/material";
import Header from "../HomePage/Header";
import Footer from "../HomePage/Footer";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(120); // 2 min

  // countdown jab loading true ho
  useEffect(() => {
    if (!loading) {
      setSecondsLeft(120); // reset
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
    setLoading(true);
    setMessage("");
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
          }}
        >
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
          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
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
                "Sign Up"
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
      <Footer />
    </>
  );
}

