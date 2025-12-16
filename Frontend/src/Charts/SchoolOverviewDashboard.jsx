// SchoolOverviewDashboard.jsx - uses backend KPIs ✅
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

  // backend se aane wale data ke liye states
  const [totalStudents, setTotalStudents] = useState(0);
  const [lowPerformersCount, setLowPerformersCount] = useState(0);
  const [failRate, setFailRate] = useState(0);
  const [weakestBySubject, setWeakestBySubject] = useState([]);
  const [weakestByClass, setWeakestByClass] = useState([]);
  const [students, setStudents] = useState([]);          // per‑student summary
  const [failedStudents, setFailedStudents] = useState([]); // <30% wale

  const fetchingData = async () => {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const formData = new FormData();
      formData.append("email", jwtDecode(token).email);

      const url = "http://localhost:5000/api/failedStudentData";
      const res = await axios.post(url, formData, { headers });

      const data = res.data.data;

      // KPIs
      setTotalStudents(data.totalStudents || 0);
      setLowPerformersCount(data.lowPerformersCount || 0);
      setFailRate(data.failRate || 0);

      // charts
      setWeakestBySubject(data.weakestBySubject || []);
      setWeakestByClass(data.weakestByClass || []);

      // tables
      setStudents(data.students || []);
      setFailedStudents(data.failedStudents || []);
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err.message);
      setTotalStudents(0);
      setLowPerformersCount(0);
      setFailRate(0);
      setWeakestBySubject([]);
      setWeakestByClass([]);
      setStudents([]);
      setFailedStudents([]);
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

  // Weakest by subject -> recharts data
  const subjectWeak = useMemo(
    () =>
      weakestBySubject.map((s) => ({
        subject: s.subject_id,
        weakest: s.weakest_percentage,
      })),
    [weakestBySubject]
  );

  // Weakest by class -> recharts data
  const classWeak = useMemo(
    () =>
      weakestByClass.map((c) => ({
        class: c.class_id,
        weakest: c.weakest_percentage,
      })),
    [weakestByClass]
  );

  // KPI cards
  const kpiCards = useMemo(
    () => [
      {
        label: "Total Students",
        value: totalStudents,
        color: theme.palette.text.primary,
      },
      {
        label: "Low Performers (below 40%)",
        value: lowPerformersCount,
        color: theme.palette.text.primary,
      },
      {
        label: "Fail Rate (below 30%)",
        value: `${failRate}%`,
        color: theme.palette.error.main,
      },
    ],
    [totalStudents, lowPerformersCount, failRate, theme.palette]
  );

  // filter options (class ids from backend)
  const classOptions = useMemo(() => {
    const set = new Set(students.map((s) => s.class_id));
    return ["All Classes", ...Array.from(set)];
  }, [students]);

  const [classFilter, setClassFilter] = useState("All Classes");

  // failedStudents already list of <30%, ab filter by class
  const filteredFailed = useMemo(() => {
    return failedStudents.filter((s) => {
      const byClass =
        classFilter === "All Classes" || s.class_id === classFilter;
      return byClass;
    });
  }, [failedStudents, classFilter]);

  // ✅ loading UI – tea StudentLoader
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
              School Academic Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={400}>
              Summary of performance across all classes and subjects
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
          {/* Weakest marks by Subject */}
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
                      📊 Weakest Marks by Subject
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lowest percentage scored in each subject
                    </Typography>
                  </Box>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                      data={subjectWeak}
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
                          id="subjectWeakGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={theme.palette.error.main}
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor={theme.palette.error.dark}
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                      <Bar
                        dataKey="weakest"
                        fill="url(#subjectWeakGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          {/* Weakest marks by Class */}
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
                      📈 Weakest Marks by Class
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lowest overall percentage in each class
                    </Typography>
                  </Box>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart
                      data={classWeak}
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
                          id="classWeakGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={theme.palette.warning.main}
                            stopOpacity={1}
                          />
                          <stop
                            offset="100%"
                            stopColor={theme.palette.warning.dark}
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                      </defs>
                      <Bar
                        dataKey="weakest"
                        fill="url(#classWeakGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        </Grid>

        {/* Failed students table (<30%) */}
        <Fade in={isVisible} timeout={2000} mountOnEnter>
          <Box mt={5}>
            <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
              Failed Students (Below 30%)
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
                    {filteredFailed.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          align="center"
                          sx={{ py: 4, color: "text.secondary" }}
                        >
                          No students found for selected filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredFailed.map((s, idx) => (
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
                              sx={{ fontWeight: 600, color: "error.main" }}
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
const SchoolOverviewDashboard = () => {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#6366f1" },
          error: { main: "#ef4444" },
          warning: { main: "#f59e0b" },
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

export default SchoolOverviewDashboard;
