// HighestMarksDashboard.jsx - Complete Topper Dashboard (80%+) ✅
import React, { useMemo, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Fade,
  Slide,
  Grow,
  Zoom,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { jwtDecode } from "jwt-decode";
import StudentLoader from "../StudentLoader"; // ✅ path adjust karo

// ---------- INNER DASHBOARD CONTENT ----------
const DashboardContent = () => {
  const theme = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // backend se aane wale data ke liye states - TOPPER VERSION (80%+)
  const [totalStudents, setTotalStudents] = useState(0);
  const [topPerformersCount, setTopPerformersCount] = useState(0);
  const [topperRate, setTopperRate] = useState(0);
  const [strongestBySubject, setStrongestBySubject] = useState([]);
  const [strongestByClass, setStrongestByClass] = useState([]);
  const [students, setStudents] = useState([]);         
  const [topperStudents, setTopperStudents] = useState([]); // >80% wale

  const fetchingData = async () => {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const formData = new FormData();
      formData.append("email", jwtDecode(token).email);

      // ✅ Backend endpoint for toppers data (80%+)
      const url = `${process.env.REACT_APP_SERVER_URL}/highestMark`;
      const res = await axios.post(url, formData, { headers });

      const data = res.data.data;

      // ✅ Data exactly matches your backend response
      setTotalStudents(data.totalStudents || 0);
      setTopPerformersCount(data.topPerformersCount || 0);
      setTopperRate(data.topperRate || 0);

      setStrongestBySubject(data.strongestBySubject || []);
      setStrongestByClass(data.strongestByClass || []);

      setStudents(data.students || []);
      setTopperStudents(data.topperStudents || []);
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err.message);
      setTotalStudents(0);
      setTopPerformersCount(0);
      setTopperRate(0);
      setStrongestBySubject([]);
      setStrongestByClass([]);
      setStudents([]);
      setTopperStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initDashboard = async () => {
      await fetchingData();
      setTimeout(() => setIsVisible(true), 100);
    };
    initDashboard();
  }, []);

  // Strongest by subject -> recharts data
  const subjectStrong = useMemo(
    () =>
      strongestBySubject.map((s) => ({
        subject: s.subject_id,
        strongest: s.strongest_percentage,
      })),
    [strongestBySubject]
  );

  // Strongest by class -> recharts data
  const classStrong = useMemo(
    () =>
      strongestByClass.map((c) => ({
        class: c.class_id,
        strongest: c.strongest_percentage,
      })),
    [strongestByClass]
  );

  // KPI cards - TOPPER VERSION (80%+)
  const kpiCards = useMemo(
    () => [
      {
        label: "Total Students",
        value: totalStudents,
        color: theme.palette.text.primary,
      },
      {
        label: "Top Performers (above 80%)",
        value: topPerformersCount,
        color: theme.palette.text.primary,
      },
      {
        label: "Topper Rate (above 80%)",
        value: `${topperRate}%`,
        color: theme.palette.success.main,
      },
    ],
    [totalStudents, topPerformersCount, topperRate, theme.palette]
  );

  // filter options (class ids from backend)
  const classOptions = useMemo(() => {
    const set = new Set(students.map((s) => s.class_id));
    return ["All Classes", ...Array.from(set)];
  }, [students]);

  const [classFilter, setClassFilter] = useState("All Classes");

  // topperStudents already list of >80%, ab filter by class
  const filteredToppers = useMemo(() => {
    return topperStudents.filter((s) => {
      const byClass =
        classFilter === "All Classes" || s.class_id === classFilter;
      return byClass;
    });
  }, [topperStudents, classFilter]);

  // ✅ loading UI – same StudentLoader
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.mode === "light" ? "#e5e7eb" : "#020617",
          position: "relative",
        }}
      >
        <StudentLoader />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.mode === "light" ? "#e5e7eb" : "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1100, px: 3 }}>
        {/* Header */}
        <Slide direction="up" in={isVisible} timeout={800} mountOnEnter>
          <Box mb={3} textAlign="center" sx={{ transformOrigin: "center bottom" }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              School Topper Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={400}>
              Excellence summary across all classes and subjects
            </Typography>
          </Box>
        </Slide>

        {/* KPI cards */}
        <Grid container spacing={3} mb={4} justifyContent="center">
          {kpiCards.map((item, index) => (
            <Grid key={item.label} item xs={12} sm={4} md={3}>
              <Grow
                in={isVisible}
                timeout={{ enter: 800 + index * 200 }}
                mountOnEnter
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 25px 50px rgba(15,23,42,0.15)"
                        : "0 25px 50px rgba(0,0,0,0.8)",
                    height: "100%",
                    bgcolor: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
                    color: theme.palette.text.primary,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 35px 70px rgba(15,23,42,0.25)"
                          : "0 35px 70px rgba(0,0,0,0.9)",
                      "&::before": {
                        transform: "scaleX(1)",
                      },
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.4s ease",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      textAlign: "center",
                      minHeight: 140,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1.5,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight={800}
                      color={item.color}
                      sx={{
                        lineHeight: 1,
                        textShadow:
                          theme.palette.mode === "light"
                            ? "0 2px 4px rgba(0,0,0,0.1)"
                            : "0 2px 8px rgba(0,0,0,0.5)",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Charts row */}
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {/* Strongest marks by Subject */}
          <Grid item xs={12} md={6}>
            <Zoom
              in={isVisible}
              timeout={{ enter: 1200 }}
              mountOnEnter
              style={{ transitionDelay: "200ms" }}
            >
              <Card
                sx={{
                  height: 360,
                  borderRadius: 3,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 20px 60px rgba(15,23,42,0.2)"
                      : "0 20px 60px rgba(0,0,0,0.85)",
                  bgcolor: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
                  color: theme.palette.text.primary,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 30px 80px rgba(15,23,42,0.3)"
                        : "0 30px 80px rgba(0,0,0,0.95)",
                  },
                }}
              >
                <CardContent sx={{ height: "100%", p: 3 }}>
                  <Box textAlign="center" mb={2}>
                    <Typography variant="h6" fontWeight={700} color="text.primary">
                      🏆 Strongest Marks by Subject
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Highest percentage scored in each subject
                    </Typography>
                  </Box>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                      data={subjectStrong}
                      margin={{ top: 16, right: 16, left: 0, bottom: 8 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={
                          theme.palette.mode === "light"
                            ? "#e5e7eb"
                            : "rgba(148,163,184,0.4)"
                        }
                      />
                      <XAxis
                        dataKey="subject"
                        stroke={theme.palette.text.secondary}
                        fontSize={12}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tickFormatter={(v) => `${v}%`}
                        stroke={theme.palette.text.secondary}
                      />
                      <Tooltip
                        formatter={(v) => [`${v}%`, "Score"]}
                        contentStyle={{
                          background: theme.palette.background.paper,
                          borderRadius: 12,
                          border: `1px solid ${theme.palette.divider}`,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                          fontSize: 13,
                        }}
                      />
                      <defs>
                        <linearGradient
                          id="subjectStrongGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={theme.palette.success.main}
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor={theme.palette.success.dark}
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                      <Bar
                        dataKey="strongest"
                        fill="url(#subjectStrongGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          {/* Strongest marks by Class */}
          <Grid item xs={12} md={6}>
            <Zoom
              in={isVisible}
              timeout={{ enter: 1400 }}
              mountOnEnter
              style={{ transitionDelay: "400ms" }}
            >
              <Card
                sx={{
                  height: 360,
                  borderRadius: 3,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 20px 60px rgba(15,23,42,0.2)"
                      : "0 20px 60px rgba(0,0,0,0.85)",
                  bgcolor: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
                  color: theme.palette.text.primary,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 30px 80px rgba(15,23,42,0.3)"
                        : "0 30px 80px rgba(0,0,0,0.95)",
                  },
                }}
              >
                <CardContent sx={{ height: "100%", p: 3 }}>
                  <Box textAlign="center" mb={2}>
                    <Typography variant="h6" fontWeight={700} color="text.primary">
                      🎯 Strongest Marks by Class
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Highest overall percentage in each class
                    </Typography>
                  </Box>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                      data={classStrong}
                      margin={{ top: 16, right: 16, left: 0, bottom: 8 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={
                          theme.palette.mode === "light"
                            ? "#e5e7eb"
                            : "rgba(148,163,184,0.4)"
                        }
                      />
                      <XAxis
                        dataKey="class"
                        stroke={theme.palette.text.secondary}
                        fontSize={12}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tickFormatter={(v) => `${v}%`}
                        stroke={theme.palette.text.secondary}
                      />
                      <Tooltip
                        formatter={(v) => [`${v}%`, "Score"]}
                        contentStyle={{
                          background: theme.palette.background.paper,
                          borderRadius: 12,
                          border: `1px solid ${theme.palette.divider}`,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                          fontSize: 13,
                        }}
                      />
                      <defs>
                        <linearGradient
                          id="classStrongGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={theme.palette.primary.main}
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor={theme.palette.primary.dark}
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                      <Bar
                        dataKey="strongest"
                        fill="url(#classStrongGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        </Grid>

        {/* Topper students table (>80%) */}
        <Fade in={isVisible} timeout={2000} mountOnEnter>
          <Box mt={5}>
            <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
              Topper Students (Above 80%)
            </Typography>

            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Slide
                  direction="right"
                  in={isVisible}
                  timeout={2200}
                  mountOnEnter
                >
                  <FormControl fullWidth size="small" variant="outlined">
                    <InputLabel>Class</InputLabel>
                    <Select
                      label="Class"
                      value={classFilter}
                      onChange={(e) => setClassFilter(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.divider,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      {classOptions.map((cls) => (
                        <MenuItem key={cls} value={cls}>
                          {cls}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Slide>
              </Grid>
            </Grid>

            <Grow in={isVisible} timeout={2600} mountOnEnter>
              <Paper
                sx={{
                  maxHeight: 300,
                  overflow: "auto",
                  bgcolor: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
                  borderRadius: 3,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 15px 35px rgba(15,23,42,0.12)"
                      : "0 15px 35px rgba(0,0,0,0.6)",
                }}
              >
                <Table size="small" sx={{ minWidth: 500 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "action.hover" }}>
                      <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                        Enroll ID
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                        Class
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: 600, color: "text.primary" }}
                      >
                        Percentage
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredToppers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          align="center"
                          sx={{ py: 4, color: "text.secondary" }}
                        >
                          No toppers found for selected class.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredToppers.map((s, idx) => (
                        <Grow
                          key={`${s.enroll_id}-${idx}`}
                          in={true}
                          timeout={300 + idx * 100}
                        >
                          <TableRow
                            sx={{
                              "&:hover": {
                                bgcolor: "action.hover",
                                transform: "scale(1.01)",
                                transition: "all 0.2s ease",
                              },
                            }}
                          >
                            <TableCell sx={{ fontWeight: 500 }}>
                              {s.enroll_id}
                            </TableCell>
                            <TableCell>{s.class_id}</TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontWeight: 600, color: "success.main" }}
                            >
                              {s.percentage}%
                            </TableCell>
                          </TableRow>
                        </Grow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Paper>
            </Grow>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};

// ---------- OUTER WRAPPER WITH THEME + TOGGLE ----------
const HighestMarks = () => {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#6366f1" },
          success: { main: "#10b981" }, 
          background: {
            default: mode === "light" ? "#f3f4f6" : "#020617",
            paper: mode === "light" ? "#ffffff" : "#0b1120",
          },
        },
        typography: {
          fontFamily:
            '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: "fixed", top: 24, right: 24, zIndex: 1300 }}>
        <IconButton
          onClick={toggleMode}
          color="primary"
          size="large"
          sx={{
            bgcolor: "background.paper",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            borderRadius: "50%",
            width: 56,
            height: 56,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
              transform: "rotate(180deg) scale(1.1)",
              boxShadow: "0 12px 40px rgba(99, 102, 241, 0.4)",
            },
          }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
      <DashboardContent />
    </ThemeProvider>
  );
};

export default HighestMarks;
