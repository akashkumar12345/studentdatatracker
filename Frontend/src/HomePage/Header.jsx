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
  Divider,
  keyframes,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

/* ===== Animations ===== */
const pulseRing = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(66,165,245,0.6); }
  70% { box-shadow: 0 0 0 12px rgba(66,165,245,0); }
  100% { box-shadow: 0 0 0 0 rgba(66,165,245,0); }
`;

const hoverLift = {
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-2px)",
  },
};

const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loginAnchorEl, setLoginAnchorEl] = React.useState(null);
  const [mobileLoginAnchorEl, setMobileLoginAnchorEl] = React.useState(null);

  const mobileMenuOpen = Boolean(anchorEl);
  const loginMenuOpen = Boolean(loginAnchorEl);
  const mobileLoginOpen = Boolean(mobileLoginAnchorEl);

  const closeAll = () => {
    setAnchorEl(null);
    setLoginAnchorEl(null);
    setMobileLoginAnchorEl(null);
  };

  const handleLoginNavigate = (type) => {
    closeAll();
    if (type === "messenger") navigate("/signin-messenger");
    if (type === "tracker") navigate("/signin");
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <SchoolIcon color="primary" fontSize="large" />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Moak
          </Typography>
        </Box>

        {/* Desktop Nav */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Button onClick={() => navigate("/about")}>About</Button>
          <Button onClick={() => navigate("/contact")}>Contact</Button>
        </Box>

        {/* Desktop Auth */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
          <Button
            variant="outlined"
            onClick={(e) => setLoginAnchorEl(e.currentTarget)}
            sx={{ borderRadius: 30, px: 3, fontWeight: 600 }}
          >
            Login
          </Button>

          {/* ===== Desktop Login Menu ===== */}
          <Menu
            anchorEl={loginAnchorEl}
            open={loginMenuOpen}
            onClose={closeAll}
            PaperProps={{
              sx: {
                mt: 1,
                p: 1,
                borderRadius: 3,
                backdropFilter: "blur(12px)",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(245,247,250,0.95))",
                boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                minWidth: 260,
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{ px: 2, color: "text.secondary", fontWeight: 600 }}
            >
              Choose Platform
            </Typography>

            <MenuItem
              onClick={() => handleLoginNavigate("messenger")}
              sx={{
                mt: 1,
                gap: 2,
                borderRadius: 2,
                ...hoverLift,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #42a5f5, #1976d2)",
                  color: "#fff",
                  animation: `${pulseRing} 2.2s infinite`,
                }}
              >
                <ChatBubbleOutlineIcon />
              </Box>

              <Box>
                <Typography fontWeight={700}>Messenger</Typography>
                <Typography variant="caption" color="text.secondary">
                  Secure real-time communication
                </Typography>
              </Box>
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            <MenuItem
              onClick={() => handleLoginNavigate("tracker")}
              sx={{
                gap: 2,
                borderRadius: 2,
                ...hoverLift,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #66bb6a, #2e7d32)",
                  color: "#fff",
                }}
              >
                <TrackChangesIcon />
              </Box>

              <Box>
                <Typography fontWeight={700}>Tracker</Typography>
                <Typography variant="caption" color="text.secondary">
                  Monitor & manage student record.
                </Typography>
              </Box>
            </MenuItem>
          </Menu>

          <Button
            variant="contained"
            onClick={() => window.open("/signup", "_blank")}
            sx={{ borderRadius: 30, px: 3, fontWeight: 600 }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Main Menu */}
        <Menu anchorEl={anchorEl} open={mobileMenuOpen} onClose={closeAll}>
          {["Home", "About", "Contact", "Login", "Sign Up"].map((item) => (
            <MenuItem
              key={item}
              onClick={(e) =>
                item === "Login"
                  ? setMobileLoginAnchorEl(e.currentTarget)
                  : item === "Sign Up"
                  ? window.open("/signup", "_blank")
                  : navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)
              }
            >
              {item}
            </MenuItem>
          ))}
        </Menu>

        {/* Mobile Login Submenu */}
        <Menu
          anchorEl={mobileLoginAnchorEl}
          open={mobileLoginOpen}
          onClose={closeAll}
        >
          <MenuItem onClick={() => handleLoginNavigate("messenger")}>
            <ChatBubbleOutlineIcon sx={{ mr: 1 }} /> Messenger
          </MenuItem>
          <MenuItem onClick={() => handleLoginNavigate("tracker")}>
            <TrackChangesIcon sx={{ mr: 1 }} /> Tracker
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
