import React from "react";
import { Box, Typography, Link as MuiLink, Grid } from "@mui/material";

const ContactSection = () => {
  return (
    // 🔵 Same full-page blue background as About
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: { xs: 4, md: 6 },
        background: "linear-gradient(135deg, #5bb4ff, #62c0ff, #4aa0ff)",
      }}
    >
      {/* Centered container */}
      <Box
        sx={{
          maxWidth: 900,
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            borderRadius: 3,
            p: { xs: 3, sm: 4, md: 5 },
            bgcolor: "rgba(255,255,255,0.97)",
            border: "1px solid rgba(148,163,184,0.4)",
            boxShadow: "0 18px 32px rgba(15,23,42,0.35)",
          }}
        >
          <Grid container spacing={4}>
            {/* Left: Heading + description */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 2, color: "#1f2933" }}
              >
                Contact
              </Typography>

              <Typography sx={{ mb: 2.5, color: "#4b5563" }}>
                Have a question about Student Data Tracker or want to discuss
                collaboration and opportunities? Feel free to reach out.
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1.5, color: "#6b7280", fontStyle: "italic" }}
              >
                Student Data Tracker (MoAk) is a full‑stack student performance
                monitoring system built end‑to‑end using React, Node.js, and
                PostgreSQL.
              </Typography>
            </Grid>

            {/* Right: Contact details */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.75,
                  color: "#4b5563",
                }}
              >
                <Typography sx={{ fontWeight: 600, color: "#111827" }}>
                  Akash Kumar
                </Typography>
                <Typography sx={{ mb: 0.5, color: "#374151" }}>
                  Full Stack Developer (React &amp; Node.js)
                </Typography>

                <Typography>Karnataka, India</Typography>

                <Typography>
                  Email:{" "}
                  <MuiLink href="mailto:akashvidhuri6@gmail.com">
                    akashvidhuri6@gmail.com
                  </MuiLink>
                </Typography>

                <Typography>
                  LinkedIn:{" "}
                  <MuiLink
                    href="https://linkedin.com/in/akash-kumar-124311202"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/akash-kumar-124311202
                  </MuiLink>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactSection;
