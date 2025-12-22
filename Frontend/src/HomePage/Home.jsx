import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Header />

      {/* Info marquee / banner */}
{/* Info marquee / banner */}
<Box
  sx={{
    width: "100%",
    bgcolor: "#0d47a1",
    color: "#fff",
    py: 0.5,
    px: 0,
    overflow: "hidden",          // container se bahar na dikhe
    position: "relative",
    whiteSpace: "nowrap",
  }}
>
  <Box
    component="div"
    sx={{
      display: "inline-block",
      px: 2,
      animation: "scrollText 18s linear infinite",
      "@keyframes scrollText": {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      fontSize: { xs: "0.8rem", md: "0.9rem" },
      fontWeight: 500,
    }}
  >
    Moak is continuously evolving — new features and improvements are
    being added daily. Stay connected for regular updates and
    enhancements.
  </Box>
</Box>


      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
          color: "#fff",
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 0 },
        }}
      >
        {/* Left: text */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            pr: { md: 6 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Welcome to Moak 
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: 600,
              mb: 4,
              mx: { xs: "auto", md: 0 },
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Streamline student management with comprehensive tracking,
            performance analytics, and intelligent insights. Add students,
            monitor progress, and identify improvement opportunities—all in one
            unified platform.
          </Typography>
        </Box>

        {/* Right: image */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" }, // hide on mobile
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/home.png" // public/home.png
            alt="Student dashboard illustration"
            sx={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: 380,
            }}
          />
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Home;
