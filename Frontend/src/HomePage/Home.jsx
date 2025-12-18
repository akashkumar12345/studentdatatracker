import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Button, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Header />

      <Box
        sx={{
          height: "85vh",
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
            sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Welcome to Moak 🚀
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

          {/* <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#2196f3",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              "&:hover": { backgroundColor: "#e3f2fd" },
            }}
          >
            Get Started
          </Button> */}
        </Box>

        {/* Right: image */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" }, // mobile pe hide
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/home.png"          // public/home.png
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
