"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import {
  LogIn,
  LogOut,
  Coffee,
  CoffeeIcon,
  Clock,
  TrendingUp,
  Calendar as CalendarIcon,
} from "lucide-react";
import Image from "next/image";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type StaffStatus = "logged_out" | "logged_in" | "on_break";

interface TodayData {
  status: StaffStatus;
  workHours: number;
  breakHours: number;
  netHours: number;
  loginTime?: string;
  lastBreakIn?: string;
}

interface DailyLog {
  date: string;
  workHours: number;
  breakHours: number;
  netHours: number;
}

interface MonthlySummary {
  totalWorkHours: number;
  totalBreakHours: number;
  totalNetHours: number;
  daysPresent: number;
  dailyData?: DailyLog[];
  DailyLogs?: DailyLog[];
}

export default function StaffDashboardPage() {
  const [staffId, setStaffId] = useState<string>("");
  const [todayData, setTodayData] = useState<TodayData>({
    status: "logged_out",
    workHours: 0,
    breakHours: 0,
    netHours: 0,
  });
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary>({
    totalWorkHours: 0,
    totalBreakHours: 0,
    totalNetHours: 0,
    daysPresent: 0,
    dailyData: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    // Get staffId from localStorage or user context
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Use staffId from user object; this should be set by the backend
        setStaffId(user.staffId || user.userId || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Redirect to login if user data is invalid
        window.location.href = "/auth/login";
      }
    } else {
      // No user data, redirect to login
      window.location.href = "/auth/login";
    }
  }, []);

  useEffect(() => {
    if (staffId) {
      fetchTodayData();
      fetchMonthlySummary();
      // Refresh today's data every minute
      const interval = setInterval(fetchTodayData, 60000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffId]);

  const fetchTodayData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/timetracking/today/${staffId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTodayData(data);
      }
    } catch (error) {
      console.error("Error fetching today's data:", error);
    }
  };

  const fetchMonthlySummary = async () => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const response = await fetch(
        `${API_URL}/api/timetracking/summary/${staffId}/${year}/${month}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // Normalize the data - handle both dailyData and DailyLogs
        // TODO: Backend should standardize on a single property name (preferably dailyData)
        // This workaround maintains compatibility with both API response formats
        const normalizedData = {
          ...data,
          dailyData: data.dailyData || data.DailyLogs || [],
        };
        setMonthlySummary(normalizedData);
      }
    } catch (error) {
      console.error("Error fetching monthly summary:", error);
    }
  };

  const handleTimeTrackingAction = async (action: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/timetracking/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ staffId }),
      });

      if (response.ok) {
        const actionMessages: { [key: string]: string } = {
          login: "Logged in successfully",
          logout: "Logged out successfully",
          "break-in": "Break started",
          "break-out": "Break ended",
        };
        showSnackbar(actionMessages[action] || "Action completed", "success");
        fetchTodayData();
        fetchMonthlySummary();
      } else {
        const error = await response.json();
        showSnackbar(error.message || "Action failed", "error");
      }
    } catch (error) {
      console.error("Error performing action:", error);
      showSnackbar("Error performing action", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusColor = (status: StaffStatus) => {
    switch (status) {
      case "logged_in":
        return "#10b981";
      case "on_break":
        return "#f59e0b";
      case "logged_out":
        return "#6b7280";
    }
  };

  const getStatusText = (status: StaffStatus) => {
    switch (status) {
      case "logged_in":
        return "Logged In";
      case "on_break":
        return "On Break";
      case "logged_out":
        return "Logged Out";
    }
  };

  const formatHours = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        background: (theme) => theme.palette.background.default,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background effects */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          background:
            "radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 40%)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box mb={4}>
          <Box
            sx={{
              width: 64,
              height: 64,
              mb: 2,
              position: "relative",
            }}
          >
            <Image
              src="/Main_Logo.png"
              alt="BasraTech AI Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Staff Dashboard
            </Box>
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Welcome back! Current Status:
            </Typography>
            <Chip
              label={getStatusText(todayData.status)}
              sx={{
                backgroundColor: `${getStatusColor(todayData.status)}20`,
                color: getStatusColor(todayData.status),
                fontWeight: 600,
              }}
            />
          </Stack>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {/* Time Tracking Actions */}
          <Box>
            <Card
              sx={{
                backgroundColor: "#111827",
                border: "1px solid #1f2937",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <Clock size={24} style={{ color: "#22d3ee" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Time Tracking
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<LogIn size={20} />}
                    disabled={todayData.status !== "logged_out" || isLoading}
                    onClick={() => handleTimeTrackingAction("login")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      py: 1.5,
                      "&:disabled": {
                        background: "#374151",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<Coffee size={20} />}
                    disabled={todayData.status !== "logged_in" || isLoading}
                    onClick={() => handleTimeTrackingAction("break-in")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      py: 1.5,
                      "&:disabled": {
                        background: "#374151",
                      },
                    }}
                  >
                    Break In
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<CoffeeIcon size={20} />}
                    disabled={todayData.status !== "on_break" || isLoading}
                    onClick={() => handleTimeTrackingAction("break-out")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                      py: 1.5,
                      "&:disabled": {
                        background: "#374151",
                      },
                    }}
                  >
                    Break Out
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<LogOut size={20} />}
                    disabled={
                      todayData.status === "logged_out" ||
                      todayData.status === "on_break" ||
                      isLoading
                    }
                    onClick={() => handleTimeTrackingAction("logout")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                      py: 1.5,
                      "&:disabled": {
                        background: "#374151",
                      },
                    }}
                  >
                    Logout
                  </Button>
                </Stack>

                {todayData.loginTime && (
                  <Box mt={3} p={2} sx={{ backgroundColor: "#0a0f1a", borderRadius: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Today&apos;s Login Time
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {new Date(todayData.loginTime).toLocaleTimeString()}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* Today's Summary */}
          <Box>
            <Card
              sx={{
                backgroundColor: "#111827",
                border: "1px solid #1f2937",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <CalendarIcon size={24} style={{ color: "#22d3ee" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Today&apos;s Summary
                  </Typography>
                </Stack>

                <Stack spacing={3}>
                  <Paper
                    sx={{
                      p: 3,
                      backgroundColor: "#0a0f1a",
                      border: "1px solid #1f2937",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Work Hours
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="#10b981">
                      {formatHours(todayData.workHours)}
                    </Typography>
                  </Paper>

                  <Paper
                    sx={{
                      p: 3,
                      backgroundColor: "#0a0f1a",
                      border: "1px solid #1f2937",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Break Hours
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="#f59e0b">
                      {formatHours(todayData.breakHours)}
                    </Typography>
                  </Paper>

                  <Paper
                    sx={{
                      p: 3,
                      backgroundColor: "rgba(14, 165, 233, 0.1)",
                      border: "1px solid rgba(14, 165, 233, 0.2)",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Net Work Hours
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{
                        background:
                          "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #6366f1 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {formatHours(todayData.netHours)}
                    </Typography>
                  </Paper>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Monthly Summary Stats */}
        <Box sx={{ mt: 3 }}>
            <Card
              sx={{
                backgroundColor: "#111827",
                border: "1px solid #1f2937",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <TrendingUp size={24} style={{ color: "#22d3ee" }} />
                  <Typography variant="h6" fontWeight={600}>
                    Monthly Summary
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(4, 1fr)",
                    },
                    gap: 3,
                    mb: 4,
                  }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      backgroundColor: "#0a0f1a",
                      border: "1px solid #1f2937",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Total Work Hours
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="#10b981">
                      {formatHours(monthlySummary.totalWorkHours)}
                    </Typography>
                  </Paper>
                  <Paper
                    sx={{
                      p: 3,
                      backgroundColor: "#0a0f1a",
                      border: "1px solid #1f2937",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Total Break Hours
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="#f59e0b">
                      {formatHours(monthlySummary.totalBreakHours)}
                    </Typography>
                  </Paper>
                  <Paper
                    sx={{
                      p: 3,
                      backgroundColor: "#0a0f1a",
                      border: "1px solid #1f2937",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Net Work Hours
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="#22d3ee">
                      {formatHours(monthlySummary.totalNetHours)}
                    </Typography>
                  </Paper>
                  <Paper
                      sx={{
                        p: 3,
                        backgroundColor: "#0a0f1a",
                        border: "1px solid #1f2937",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Days Present
                      </Typography>
                      <Typography variant="h5" fontWeight={700} color="#a78bfa">
                        {monthlySummary.daysPresent}
                      </Typography>
                    </Paper>
                  </Box>

                  <Divider sx={{ my: 3, borderColor: "#1f2937" }} />

                  {/* Charts */}
                  {monthlySummary.dailyData && monthlySummary.dailyData.length > 0 && (
                  <Box>
                    <Typography variant="h6" fontWeight={600} mb={3}>
                      Daily Work Hours Trend
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlySummary.dailyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis
                          dataKey="date"
                          stroke="#9ca3af"
                          tick={{ fill: "#9ca3af" }}
                        />
                        <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#111827",
                            border: "1px solid #1f2937",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="workHours"
                          stroke="#10b981"
                          strokeWidth={2}
                          name="Work Hours"
                        />
                        <Line
                          type="monotone"
                          dataKey="netHours"
                          stroke="#22d3ee"
                          strokeWidth={2}
                          name="Net Hours"
                        />
                      </LineChart>
                    </ResponsiveContainer>

                    <Box mt={4}>
                      <Typography variant="h6" fontWeight={600} mb={3}>
                        Work vs Break Hours
                      </Typography>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlySummary.dailyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                          <XAxis
                            dataKey="date"
                            stroke="#9ca3af"
                            tick={{ fill: "#9ca3af" }}
                          />
                          <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af" }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#111827",
                              border: "1px solid #1f2937",
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="workHours"
                            fill="#10b981"
                            name="Work Hours"
                          />
                          <Bar
                            dataKey="breakHours"
                            fill="#f59e0b"
                            name="Break Hours"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
