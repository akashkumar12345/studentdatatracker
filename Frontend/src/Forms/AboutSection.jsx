import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const AboutSection = () => {
  return (
    // 🔵 Full-page blue background (like your form)
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
      {/* White card in center */}
      <Box
        sx={{
          maxWidth: 960,
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            bgcolor: "rgba(255,255,255,0.97)",
            border: "1px solid rgba(148,163,184,0.4)",
            boxShadow: "0 18px 32px rgba(15,23,42,0.35)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#1f2933",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 32,
                borderRadius: 12,
                background:
                  "linear-gradient(180deg, #2563eb, #4f46e5, #7c3aed)",
              }}
            />
            Student Data Tracker
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{ mb: 2.5, color: "#4b5563" }}
          >
            A web-based Teacher Panel that helps schools manage complete
            student academic data in one place. Teachers can easily add
            students, track their performance, and view real-time insights
            into their progress.
          </Typography>

          <Divider sx={{ mb: 3, borderColor: "rgba(148,163,184,0.6)" }} />

          <Typography
            variant="h6"
            sx={{ mb: 1.5, fontWeight: 600, color: "#111827" }}
          >
            Key Features
          </Typography>

          <List
            dense
            sx={{
              mb: 2.5,
              "& .MuiListItem-root": {
                alignItems: "flex-start",
                borderRadius: 1.5,
                mb: 1,
                transition: "background 0.25s ease, transform 0.15s ease",
                "&:hover": {
                  background: "rgba(37,99,235,0.08)",
                  transform: "translateY(-1px)",
                },
              },
            }}
          >
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "#111827", fontWeight: 600 },
                }}
                secondaryTypographyProps={{
                  sx: { color: "#4b5563", mt: 0.5, fontSize: 14 },
                }}
                primary="Add Student"
                secondary="Securely store each student's personal, contact, and academic information through a detailed form."
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "#111827", fontWeight: 600 },
                }}
                secondaryTypographyProps={{
                  sx: { color: "#4b5563", mt: 0.5, fontSize: 14 },
                }}
                primary="Upload Data"
                secondary="Upload marks or records in bulk using CSV/Excel to reduce manual work and avoid errors."
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "#111827", fontWeight: 600 },
                }}
                secondaryTypographyProps={{
                  sx: { color: "#4b5563", mt: 0.5, fontSize: 14 },
                }}
                primary="View by Student ID"
                secondary="Instantly fetch any student's complete record just by entering their Student ID."
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "#111827", fontWeight: 600 },
                }}
                secondaryTypographyProps={{
                  sx: { color: "#4b5563", mt: 0.5, fontSize: 14 },
                }}
                primary="Weak Students & Suggestions"
                secondary="Identify struggling students early and get data‑driven suggestions to support their improvement."
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  sx: { color: "#111827", fontWeight: 600 },
                }}
                secondaryTypographyProps={{
                  sx: { color: "#4b5563", mt: 0.5, fontSize: 14 },
                }}
                primary="Toppers List"
                secondary="View top performers clearly and compare their academic performance across subjects or exams."
              />
            </ListItem>
          </List>

          <Typography
            variant="body1"
            sx={{ mt: 1.5, color: "#374151" }}
          >
            The primary goal of this project is to replace manual registers
            and scattered spreadsheets with a centralized, fast, and intuitive
            system, enabling teachers to spend less time on data management
            and more time on actual teaching.
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 2.5, color: "#6b7280", fontStyle: "italic" }}
          >
            Tech Stack: React (Material‑UI), Node.js / Express, PostgreSQL.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSection;
