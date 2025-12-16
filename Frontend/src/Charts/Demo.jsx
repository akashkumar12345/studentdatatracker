// LowPerformanceBarChart.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

const LowPerformanceBarChart = ({ students }) => {
  const theme = useTheme();

  // students: [{ name, percentage }, ...]
  const data = (students || [])
    .filter((s) => Number(s.percentage) < 40)
    .map((s) => ({
      name: s.name,
      percentage: Number(s.percentage),
    }));

  // ------------ No data state ------------
  if (!data.length) {
    return (
      <Card
        sx={{
          height: 260,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" color="text.primary" gutterBottom>
          All students are above 40% 🎉
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No low‑performing students for the selected filters.
        </Typography>
      </Card>
    );
  }

  const count = data.length;

  return (
    <Card
      sx={{
        height: 380,
        bgcolor:
          theme.palette.mode === "light"
            ? "#f9fafb"
            : theme.palette.background.default,
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
        borderRadius: 3,
        border: "1px solid",
        borderColor:
          theme.palette.mode === "light"
            ? "#e5e7eb"
            : "rgba(148, 163, 184, 0.5)",
      }}
    >
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle1" fontWeight={600}>
              Students Below 40%
            </Typography>
            <Chip
              label={`${count}`}
              size="small"
              color="error"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        }
        subheader="At‑risk students by percentage"
        sx={{
          pb: 0,
          "& .MuiCardHeader-subheader": {
            fontSize: 12,
            color: theme.palette.text.secondary,
          },
        }}
      />

      <CardContent sx={{ height: 320, pt: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 16, right: 24, left: 80, bottom: 8 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke={
                theme.palette.mode === "light"
                  ? "#e5e7eb"
                  : "rgba(148, 163, 184, 0.4)"
              }
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              formatter={(v) => `${v}%`}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                boxShadow: "0 8px 20px rgba(15,23,42,0.12)",
                fontSize: 12,
              }}
            />
            <ReferenceLine
              x={40}
              stroke={theme.palette.error.main}
              strokeDasharray="4 4"
              label={{
                value: "40% threshold",
                position: "top",
                fill: theme.palette.error.main,
                fontSize: 11,
              }}
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="lowPerfGradient" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0%"
                  stopColor={theme.palette.error.light}
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor={theme.palette.warning.main}
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>
            <Bar
              dataKey="percentage"
              fill="url(#lowPerfGradient)"
              radius={[4, 4, 4, 4]}
              barSize={22}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Small legend text */}
        <Box mt={1.5} display="flex" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
            Showing students with overall score below 40%.
          </Typography>
          <Typography variant="caption" color="error.main">
            Red dashed line: 40% pass mark
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LowPerformanceBarChart;
