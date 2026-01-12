import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function OtpVerify() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const inputRefs = useRef([]);
  const email = atob(useParams().email); // Decode
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && secondsLeft === 0) return;
    if (!loading) return;
    const id = setInterval(
      () => setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, [loading, secondsLeft]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").trim();
    if (!/^\d{4,6}$/.test(data)) return;
    const digits = data.slice(0, 6).split("");
    const next = Array(6)
      .fill("")
      .map((_, i) => digits[i] || "");
    setOtp(next);
    const last = digits.length - 1;
    inputRefs.current[last >= 0 ? last : 0]?.focus();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const code = otp.join("");
  //   if (code.length !== 6) {
  //     setMessage("Please enter the 6‑digit code.");
  //     return;
  //   }
  //   setLoading(true);
  //   setMessage("");

  //   try {
  //     await axios.post(
  //       `${process.env.REACT_APP_SERVER_URL}/auth/verify-otp`,
  //       { otp: code , email : email}
  //     );
  //     setMessage("✅ OTP verified successfully!");
  //     navigate('/dash');
  //   } catch (err) {
  //     setMessage(
  //       err.response?.data?.error || "❌ Invalid or expired OTP. Try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //     setSecondsLeft(60);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const code = otp.join("");
  if (code.length !== 6) {
    setMessage("Please enter the 6‑digit code.");
    return;
  }
  
  setLoading(true);
  setMessage("");

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/verify-otp`,
      { otp: code, email: email }
    );

    // console.log("Verify OTP response:", response.data); // Debug

    // ✅ TOKEN SAVE (exact response structure)
    Cookies.set("token", response.data.token, { 
      expires: 7, 
      secure: true, 
      sameSite: 'strict' 
    });
    
    setMessage("✅ Login successful! Redirecting...");
    
    setTimeout(() => {
      navigate('/dash');
    }, 1500);

  } catch (err) {
    console.error("OTP Error:", err.response?.data);
    setMessage(err.response?.data?.error || "❌ Invalid OTP");
  } finally {
    setLoading(false);
    setSecondsLeft(60);
  }
};

  const handleResend = async () => {
    if (secondsLeft > 0) return;
    setLoading(true);
    setMessage("");
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/resend-otp`
      );
      setMessage("✅ New OTP sent to your email.");
      setSecondsLeft(60);
    } catch (err) {
      setMessage(
        err.response?.data?.error || "❌ Failed to resend OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputFont = isXs ? "1.2rem" : "1.4rem";

  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: isXs
          ? "#ffffff"
          : "linear-gradient(135deg, #42a5f5 0%, #478ed1 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "flex-start", md: "center" },
        pt: { xs: 6, md: 4 },
        pb: { xs: 4, md: 4 },
        px: { xs: 0, sm: 2 },
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={6}>
          <Paper
            elevation={10}
            sx={{
              borderRadius: 4,
              mx: "auto",
              maxWidth: 480,
              bgcolor: "#ffffff",
              p: { xs: 3, sm: 4 },
              position: "relative",
              overflow: "visible",
            }}
          >
            {/* floating avatar same as login */}
            <Avatar
              sx={{
                width: isXs ? 72 : 80,
                height: isXs ? 72 : 80,
                background:
                  "radial-gradient(circle at 30% 20%, #7e57c2 0%, #5c6bc0 45%, #283593 100%)",
                color: "#e8eaf6",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                position: "absolute",
                top: isXs ? -36 : -40,
                left: "50%",
                transform: "translateX(-50%)",
                border: "3px solid #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SecurityIcon
                sx={{
                  fontSize: isXs ? 38 : 42,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                }}
              />
            </Avatar>

            <Box sx={{ mt: isXs ? 5 : 6 }}>
              <Box
                sx={{
                  width: 48,
                  height: 4,
                  borderRadius: 999,
                  bgcolor: "rgba(15,23,42,0.15)",
                  mx: "auto",
                  mb: 2,
                }}
              />

              {/* <Typography
                variant="overline"
                sx={{
                  letterSpacing: 2.5,
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                TWO‑STEP CHECK
              </Typography> */}
              <Typography
                variant={isXs ? "h5" : "h4"}
                sx={{
                  fontWeight: 800,
                  mb: 0.6,
                  letterSpacing: 0.3,
                }}
              >
                Confirm your OTP
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                Enter the 6‑digit verification code sent to your email.
              </Typography>

              {/* OTP row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 3,
                }}
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputMode="numeric"
                    maxLength={1}
                    style={{
                      width: isXs ? 32 : 36,
                      border: "none",
                      borderBottom: "2px solid rgba(148,163,184,0.7)",
                      outline: "none",
                      background: "transparent",
                      textAlign: "center",
                      fontSize: inputFont,
                      marginInline: 4,
                      transition: "all 0.18s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderBottom =
                        "2px solid rgba(37,99,235,1)";
                      e.target.style.boxShadow =
                        "0 4px 10px rgba(37,99,235,0.25)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderBottom =
                        "2px solid rgba(148,163,184,0.7)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                ))}
              </Box>

              <form onSubmit={handleSubmit}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.1,
                    fontWeight: 700,
                    borderRadius: 999,
                    textTransform: "none",
                    boxShadow: "0 8px 18px rgba(37,99,235,0.4)",
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress
                        size={20}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                      Verifying...
                    </>
                  ) : (
                    "Verify code"
                  )}
                </Button>
              </form>

              <Box
                sx={{
                  mt: 2.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  rowGap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: 13 }}
                >
                  Didn&apos;t get it? Check spam or request a new code.
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleResend}
                  disabled={secondsLeft > 0 || loading}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 13,
                    p: 0,
                  }}
                >
                  {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend OTP"}
                </Button>
              </Box>

              {message && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    color: message.includes("✅") ? "#16a34a" : "#dc2626",
                    fontWeight: 500,
                    textAlign: "left",
                  }}
                >
                  {message}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
