import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  const handleSignup = () => {
    console.log("inside signup");
    window.open("/signup", "_blank"); // ✅ Opens signup page in new tab
    // navigate("signup")
  }
  const handleLogin = () => {
    console.log("inside the log in")
    window.open("/signin","/_blank");
  }

  const handleHome = () => {
    console.log("insidr the handleHome")
    navigate("/")
  }


  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* ---------- Left: Logo ---------- */}
        <Box display="flex" alignItems="center" gap={1}>
          <SchoolIcon color="primary" fontSize="large" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              letterSpacing: 0.5,
            }}
          >
            Moak
          </Typography>
        </Box>

        {/* ---------- Center: Navigation Links (hidden on mobile) ---------- */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          <Button color="inherit" onClick={handleHome}>Home</Button>
          {/* <Button color="inherit">Upload</Button> */}
          {/* <Button color="inherit">Preview</Button> */}
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Box>

        {/* ---------- Right: Login + Sign Up Buttons ---------- */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogin}
            sx={{
              borderRadius: "30px",
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={handleSignup}
            color="primary"
            sx={{
              borderRadius: "30px",
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* ---------- Mobile Menu Icon ---------- */}
        <IconButton
          color="inherit"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* ---------- Mobile Menu Dropdown ---------- */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: 200,
              mt: 1.5,
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            },
          }}
        >
          {[
            "Home",
            // "Upload",
            // "Preview",
            "About",
            "Contact",
            "Login",
            "Sign Up",
          ].map((item) => (
            <MenuItem key={item} onClick={handleMenuClose}>
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
