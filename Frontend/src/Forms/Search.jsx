import React, { useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  Grid,
} from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import MarksForm from "./MarksForm";
import StudentLoader from "../StudentLoader"; // ✅ path adjust karo

export default function Search() {
  const token = Cookies.get("token");
  const [enrollId, setEnrollId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentRows, setStudentRows] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("email", jwtDecode(token).email);
      formData.append("enroll_id", enrollId);

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/searchstud`,
        formData,
        config
      );

      if (res.status === 200) {
        setStudentRows(res.data.data);
      } else {
        setMessage("❌ Student not found");
      }

      setEnrollId("");
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Enter correct Enroll ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #42a5f5 0%, #478ed1 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: { xs: 1, sm: 3 },
        position: "relative",
      }}
    >
      {/* ✅ Tea loader overlay */}
      {loading && <StudentLoader />}

      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          background: "#ffffffee",
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <Grid container spacing={4}>
          {/* 🔍 SEARCH TITLE */}
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "primary.main",
                letterSpacing: 2,
              }}
            >
              Search Student
            </Typography>
          </Grid>

          {/* 🔍 SEARCH INPUT + BUTTON */}
          <Grid item xs={12} sm={8} md={6} mx="auto">
            <form onSubmit={handleSearch}>
              <Stack spacing={2}>
                <TextField
                  label="Enroll ID"
                  type="text"
                  required
                  fullWidth
                  value={enrollId}
                  onChange={(e) => setEnrollId(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": {
                      textAlign: "center",
                      fontWeight: "bold",
                    },
                  }}
                  InputProps={{
                    style: { background: "#f7fbfc", borderRadius: 8 },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  startIcon={<SearchIcon />}
                  disabled={loading}
                  sx={{
                    py: 1.4,
                    fontWeight: "bold",
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Search"}
                </Button>
              </Stack>
            </form>

            {message && (
              <Typography
                align="center"
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  color: message.includes("✅") ? "green" : "red",
                }}
              >
                {message}
              </Typography>
            )}
          </Grid>

          {/* 📘 MARKS FORM SECTION */}
          {studentRows.length > 0 && (
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  borderRadius: 3,
                  background: "#f8fbff",
                  boxShadow: "0 0 15px rgba(0,0,0,0.08)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "#1976d2",
                    textAlign: "center",
                  }}
                >
                  Enter Marks for: {studentRows[0].firstname}{" "}
                  {studentRows[0].lastname}
                </Typography>

                <MarksForm student={studentRows[0]} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}
