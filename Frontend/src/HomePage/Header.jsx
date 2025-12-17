import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleHome = () => {
    console.log("inside handleHome");
    navigate("/");
  };

  const handleSignup = () => {
    console.log("inside signup");
    // new tab:
    window.open("/signup", "_blank");
    // same tab:
    // navigate("/signup");
  };

  const handleLogin = () => {
    console.log("inside the login");
    window.open("/signin", "_blank");
    // or navigate("/signin");
  };

  const handleAbout = () => {
    // yahan /about route ya page scroll add kar sakte ho
    navigate("/about");
  };

  const handleContact = () => {
    // yahan /contact route ya page scroll add kar sakte ho
    navigate("/contact");
  };

  const handleMobileClick = (item) => {
    handleMenuClose();

    if (item === "Home") handleHome();
    if (item === "About") handleAbout();
    if (item === "Contact") handleContact();
    if (item === "Login") handleLogin();
    if (item === "Sign Up") handleSignup();
  };

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
        {/* Left: Logo */}
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

        {/* Center: Desktop nav */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          <Button color="inherit" onClick={handleHome}>
            Home
          </Button>
          <Button color="inherit" onClick={handleAbout}>
            About
          </Button>
          <Button color="inherit" onClick={handleContact}>
            Contact
          </Button>
        </Box>

        {/* Right: Desktop auth buttons */}
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

        {/* Mobile menu icon */}
        <IconButton
          color="inherit"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile dropdown menu */}
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
          {["Home", "About", "Contact", "Login", "Sign Up"].map((item) => (
            <MenuItem key={item} onClick={() => handleMobileClick(item)}>
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
