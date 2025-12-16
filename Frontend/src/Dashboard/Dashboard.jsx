// src/Dashboard/Dashboard.jsx
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SearchIcon from "@mui/icons-material/Search";
import InsightsIcon from "@mui/icons-material/Insights";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LogoutIcon from "@mui/icons-material/Logout";

import AddStudent from "../Forms/AddStudent";
import UploadData from "../Forms/Search";
import ViewById from "../Forms/ViewStudent";
import WeakStudents from "../Charts/SchoolOverviewDashboard";
import ToppersList from "../Charts/HighestMarks";
import LogOut from "../Logout/Logout";

const drawerWidth = 240;

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Add Student");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Removed logout from sidebar
  const menuItems = [
    { text: "Add Student", icon: <SchoolIcon /> },
    { text: "Upload Data", icon: <UploadFileIcon /> },
    { text: "View by Student ID", icon: <SearchIcon /> },
    { text: "Weak Students & Suggestions", icon: <InsightsIcon /> },
    { text: "Toppers List", icon: <EmojiEventsIcon /> },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "Add Student":
        return <AddStudent />;
      case "Upload Data":
        return <UploadData />;
      case "View by Student ID":
        return <ViewById />;
      case "Weak Students & Suggestions":
        return <WeakStudents />;
      case "Toppers List":
        return <ToppersList />;
      case "Log Out":
        return <LogOut />;
      default:
        return <Typography>Select a tab</Typography>;
    }
  };

  // Drawer UI (with animated colors)
  const drawer = (
    <Box
      sx={{
        height: "100%",
        color: "white",
        background: `linear-gradient(135deg, #1e293b, #0f172a, #1e293b)`,
        backgroundSize: "300% 300%",
        animation: "drawerGradient 8s ease infinite",
        "@keyframes drawerGradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        transition: "all 0.35s ease-in-out",
        transform: drawerOpen ? "translateX(0)" : "translateX(-25px)",
        opacity: drawerOpen ? 1 : 0,
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          mt: 2,
          mb: 2,
          opacity: drawerOpen ? 1 : 0,
          transition: "opacity 0.4s ease",
          textShadow: "0 0 10px #38bdf8",
          animation: "glowText 2s ease-in-out infinite alternate",
          "@keyframes glowText": {
            from: { textShadow: "0 0 6px #38bdf8" },
            to: { textShadow: "0 0 14px #0ea5e9" },
          },
        }}
      >
        Teacher Panel
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedTab === item.text}
              onClick={() => {
                setSelectedTab(item.text);
                if (isMobile) setDrawerOpen(false);
              }}
              sx={{
                transition: "0.25s",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                  transform: "scale(1.05)",
                  boxShadow: "0 0 10px rgba(255,255,255,0.2)",
                },
                "&.Mui-selected": {
                  background:
                    "linear-gradient(90deg, rgba(100,116,139,0.9), rgba(203,213,225,0.4))",
                  boxShadow: "0 0 12px rgba(255,255,255,0.5)",
                  transform: "scale(1.06)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  transition: "all 0.35s",
                  transform: drawerOpen ? "scale(1)" : "scale(0.7)",
                  opacity: drawerOpen ? 1 : 0,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                sx={{
                  opacity: drawerOpen ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* App Bar with animated gradient */}
      <AppBar
        position="fixed"
        sx={{
          background: `linear-gradient(90deg, #1e293b, #0f172a, #1e293b)`,
          backgroundSize: "300% 300%",
          animation: "headerGradient 6s ease infinite",
          "@keyframes headerGradient": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
          zIndex: (t) => t.zIndex.drawer + 1,
          transition: "all 0.4s ease",
        }}
      >
        <Toolbar>

          {/* Drawer Button (LEFT) */}
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon
              sx={{
                transition: "transform 0.3s ease",
                transform: drawerOpen ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </IconButton>

          {/* Page Title */}
          <Typography
            variant="h6"
            sx={{
              ml: 2,
              transition: "all 0.4s ease",
              opacity: drawerOpen ? 1 : 0.8,
            }}
          >
            {selectedTab}
          </Typography>

          {/* Push Logout to right-most */}
          <Box sx={{ flexGrow: 1 }} />

          {/* LOGOUT BUTTON (RIGHTMOST) */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setSelectedTab("Log Out")}
            sx={{
              mr: 1,
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.2)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          >
            <LogoutIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        {!isMobile && (
          <Drawer
            variant="persistent"
            open={drawerOpen}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                backgroundColor: "transparent",
                color: "white",
                transition: "all 0.4s ease",
                transform: drawerOpen ? "translateX(0)" : "translateX(-250px)",
              },
            }}
          >
            {drawer}
          </Drawer>
        )}

        {isMobile && (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                backgroundColor: "#1e293b",
                color: "white",
              },
            }}
          >
            {drawer}
          </Drawer>
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f8fafc, #e2e8f0, #f1f5f9)",
            backgroundSize: "300% 300%",
            animation: "contentBgMove 10s ease infinite",
            "@keyframes contentBgMove": {
              "0%": { backgroundPosition: "0% 0%" },
              "50%": { backgroundPosition: "100% 100%" },
              "100%": { backgroundPosition: "0% 0%" },
            },
            transition: "all 0.4s ease",
            ml: !isMobile && drawerOpen ? `${drawerWidth}px` : "0px",
            transform: drawerOpen ? "scale(1)" : "scale(1.02)",
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
