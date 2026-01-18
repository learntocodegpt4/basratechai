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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Paper,
  Chip,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { CalendarPlus, Calendar, X } from "lucide-react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Holiday {
  holidayId: string;
  name: string;
  date: string;
  isRecurring: boolean;
  description?: string;
}

interface HolidayFormData {
  name: string;
  date: string;
  isRecurring: boolean;
  description: string;
}

export default function HolidaysPage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [formData, setFormData] = useState<HolidayFormData>({
    name: "",
    date: new Date().toISOString().split("T")[0],
    isRecurring: false,
    description: "",
  });

  useEffect(() => {
    fetchHolidays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await fetch(`${API_URL}/api/holidays`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHolidays(data);
      } else {
        showSnackbar("Failed to fetch holidays", "error");
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
      showSnackbar("Error fetching holidays", "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/holidays`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showSnackbar("Holiday added successfully", "success");
        setOpenDialog(false);
        fetchHolidays();
        resetForm();
      } else {
        const error = await response.json();
        showSnackbar(error.message || "Failed to add holiday", "error");
      }
    } catch (error) {
      console.error("Error adding holiday:", error);
      showSnackbar("Error adding holiday", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      date: new Date().toISOString().split("T")[0],
      isRecurring: false,
      description: "",
    });
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
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
                  Holiday Management
                </Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                HR Management System - Admin Only
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<CalendarPlus size={20} />}
              onClick={() => setOpenDialog(true)}
              sx={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                "&:hover": {
                  boxShadow: "0 10px 30px rgba(14, 165, 233, 0.3)",
                },
              }}
            >
              Add New Holiday
            </Button>
          </Stack>
        </Box>

        {/* Holidays Table */}
        <Card
          sx={{
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Calendar size={24} style={{ color: "#22d3ee" }} />
              <Typography variant="h6" fontWeight={600}>
                Company Holidays ({holidays.length})
              </Typography>
            </Stack>

            <TableContainer component={Paper} sx={{ backgroundColor: "#0a0f1a" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1f2937" }}>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Holiday Name
                    </TableCell>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Date
                    </TableCell>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Type
                    </TableCell>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holidays.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">
                          No holidays found. Click &quot;Add New Holiday&quot; to add one.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    holidays.map((holiday) => (
                      <TableRow
                        key={holiday.holidayId}
                        sx={{
                          "&:hover": { backgroundColor: "#1f2937" },
                        }}
                      >
                        <TableCell>
                          <Typography fontWeight={600}>
                            {holiday.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {new Date(holiday.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={holiday.isRecurring ? "Recurring" : "One-time"}
                            size="small"
                            sx={{
                              backgroundColor: holiday.isRecurring
                                ? "rgba(99, 102, 241, 0.1)"
                                : "rgba(14, 165, 233, 0.1)",
                              color: holiday.isRecurring ? "#a5b4fc" : "#22d3ee",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              maxWidth: 300,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {holiday.description || "—"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>

      {/* Add Holiday Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={600}>
              Add New Holiday
            </Typography>
            <IconButton onClick={() => setOpenDialog(false)} size="small">
              <X size={20} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3} mt={2}>
              <TextField
                fullWidth
                required
                name="name"
                label="Holiday Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., New Year's Day"
              />
              <TextField
                fullWidth
                required
                type="date"
                name="date"
                label="Date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isRecurring}
                    onChange={handleChange}
                    name="isRecurring"
                    sx={{
                      color: "#22d3ee",
                      "&.Mui-checked": {
                        color: "#22d3ee",
                      },
                    }}
                  />
                }
                label="Recurring Holiday (e.g., annual holiday)"
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                name="description"
                label="Description (Optional)"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add any additional details about this holiday"
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isLoading}
            sx={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
            }}
          >
            {isLoading ? "Adding..." : "Add Holiday"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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
