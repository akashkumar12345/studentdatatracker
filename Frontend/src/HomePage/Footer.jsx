import React from "react";
import { Box, Typography, Grid, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SchoolIcon from "@mui/icons-material/School";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0d47a1",
        color: "white",
        mt: 8,
        py: 4,
        px: { xs: 3, md: 8 },
      }}
    >
      <Grid container spacing={4}>
        {/* ---------- Left: Brand ---------- */}
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" gap={1}>
            <SchoolIcon fontSize="large" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Moak
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1.5, opacity: 0.8 }}>
            Create beautiful presentations instantly using the power of AI.
            Upload, generate, and preview — all in one place.
          </Typography>
        </Grid>

        {/* ---------- Center: Quick Links ---------- */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Quick Links
          </Typography>
          {["Home", "Upload", "Preview", "About", "Contact"].map((link) => (
            <Typography key={link} variant="body2" sx={{ mb: 0.5 }}>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{
                  "&:hover": { color: "#bbdefb", transition: "0.3s" },
                }}
              >
                {link}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* ---------- Right: Social Media ---------- */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Connect With Us
          </Typography>
          <Box>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#90caf9" } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#90caf9" } }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#90caf9" } }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="https://github.com"
              target="_blank"
              sx={{ color: "white", "&:hover": { color: "#90caf9" } }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* ---------- Bottom Bar ---------- */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          mt: 4,
          pt: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} Moak — All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
