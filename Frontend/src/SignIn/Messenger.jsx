import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  keyframes,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useNavigate } from "react-router-dom";

/* Animations */
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Messenger = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,

        /* Background image */
        backgroundImage:
          "url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",

        /* Dark overlay */
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(15,32,39,0.9), rgba(44,83,100,0.9))",
          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={24}
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 520,
          width: "100%",
          p: 5,
          borderRadius: 4,
          textAlign: "center",

          backdropFilter: "blur(14px)",
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff",

          animation: `${fadeUp} 0.9s ease-out`,
        }}
      >
        {/* Animated Icon */}
        <Box
          sx={{
            width: 90,
            height: 90,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle at top, #64b5f6, #1976d2)",
            boxShadow: "0 18px 45px rgba(0,0,0,0.6)",
            animation: `${float} 3s ease-in-out infinite`,
          }}
        >
          <ChatBubbleOutlineIcon sx={{ fontSize: 46 }} />
        </Box>

        {/* Premium badge */}
        <Chip
          icon={<AutoAwesomeIcon />}
          label="Premium Feature"
          sx={{
            mb: 2,
            background:
              "linear-gradient(90deg, #ffd54f, #ffb300)",
            fontWeight: 700,
          }}
        />

        {/* Title */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 1, letterSpacing: 0.6 }}
        >
          Messenger
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 2, opacity: 0.9 }}
        >
          Coming Soon
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{ mb: 4, lineHeight: 1.7, opacity: 0.85 }}
        >
          We’re building a <b>secure, real-time messaging experience</b> with
          premium features like instant notifications, encrypted chats, and
          seamless collaboration.
        </Typography>

        {/* CTA */}
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            px: 4,
            py: 1.3,
            borderRadius: "30px",
            fontWeight: 700,
            textTransform: "none",
            background:
              "linear-gradient(90deg, #42a5f5, #1976d2)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.7)",
            },
          }}
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
};

export default Messenger;
