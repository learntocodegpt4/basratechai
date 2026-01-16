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
} from "@mui/material";
import { UserPlus, Users, X } from "lucide-react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Staff {
  staffId: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
  department: string;
  joiningDate: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bankDetails: {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
  };
}

interface StaffFormData {
  staffId: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
  department: string;
  joiningDate: string;
  address: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [formData, setFormData] = useState<StaffFormData>({
    staffId: "",
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    designation: "",
    department: "",
    joiningDate: new Date().toISOString().split("T")[0],
    address: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
  });

  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch(`${API_URL}/api/staff`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStaff(data);
      } else {
        showSnackbar("Failed to fetch staff", "error");
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
      showSnackbar("Error fetching staff", "error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        staffId: formData.staffId,
        userId: formData.userId,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        designation: formData.designation,
        department: formData.department,
        joiningDate: formData.joiningDate,
        address: formData.address,
        emergencyContact: {
          name: formData.emergencyContactName,
          relationship: formData.emergencyContactRelationship,
          phone: formData.emergencyContactPhone,
        },
        bankDetails: {
          bankName: formData.bankName,
          accountHolderName: formData.accountHolderName,
          accountNumber: formData.accountNumber,
          ifscCode: formData.ifscCode,
        },
      };

      const response = await fetch(`${API_URL}/api/staff/onboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showSnackbar("Staff member onboarded successfully", "success");
        setOpenDialog(false);
        fetchStaff();
        resetForm();
      } else {
        const error = await response.json();
        showSnackbar(error.message || "Failed to onboard staff", "error");
      }
    } catch (error) {
      console.error("Error onboarding staff:", error);
      showSnackbar("Error onboarding staff", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      staffId: "",
      userId: "",
      name: "",
      email: "",
      phoneNumber: "",
      designation: "",
      department: "",
      joiningDate: new Date().toISOString().split("T")[0],
      address: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactPhone: "",
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
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
                  Staff Management
                </Box>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                HR Management System - Admin Only
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<UserPlus size={20} />}
              onClick={() => setOpenDialog(true)}
              sx={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                "&:hover": {
                  boxShadow: "0 10px 30px rgba(14, 165, 233, 0.3)",
                },
              }}
            >
              Onboard New Staff
            </Button>
          </Stack>
        </Box>

        {/* Staff Table */}
        <Card
          sx={{
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Users size={24} style={{ color: "#22d3ee" }} />
              <Typography variant="h6" fontWeight={600}>
                All Staff Members ({staff.length})
              </Typography>
            </Stack>

            <TableContainer component={Paper} sx={{ backgroundColor: "#0a0f1a" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1f2937" }}>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Staff ID
                    </TableCell>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Phone
                    </TableCell>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Designation
                    </TableCell>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Department
                    </TableCell>
                    <TableCell sx={{ color: "#9ca3af", fontWeight: 600 }}>
                      Joining Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staff.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">
                          No staff members found. Click &quot;Onboard New Staff&quot; to add
                          one.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    staff.map((member) => (
                      <TableRow
                        key={member.staffId}
                        sx={{
                          "&:hover": { backgroundColor: "#1f2937" },
                        }}
                      >
                        <TableCell>
                          <Chip
                            label={member.staffId}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(14, 165, 233, 0.1)",
                              color: "#22d3ee",
                            }}
                          />
                        </TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.phoneNumber}</TableCell>
                        <TableCell>{member.designation}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          {new Date(member.joiningDate).toLocaleDateString()}
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

      {/* Onboard Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
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
              Onboard New Staff Member
            </Typography>
            <IconButton onClick={() => setOpenDialog(false)} size="small">
              <X size={20} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3} mt={2}>
              {/* Basic Information */}
              <Typography variant="subtitle1" fontWeight={600}>
                Basic Information
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  required
                  name="staffId"
                  label="Staff ID"
                  value={formData.staffId}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="userId"
                  label="User ID"
                  value={formData.userId}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  type="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="phoneNumber"
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="designation"
                  label="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="department"
                  label="Department"
                  value={formData.department}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  type="date"
                  name="joiningDate"
                  label="Joining Date"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <TextField
                fullWidth
                required
                multiline
                rows={2}
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
              />

              {/* Emergency Contact */}
              <Typography variant="subtitle1" fontWeight={600} mt={2}>
                Emergency Contact
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  required
                  name="emergencyContactName"
                  label="Contact Name"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="emergencyContactRelationship"
                  label="Relationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="emergencyContactPhone"
                  label="Contact Phone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                />
              </Box>

              {/* Bank Details */}
              <Typography variant="subtitle1" fontWeight={600} mt={2}>
                Bank Details
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  required
                  name="bankName"
                  label="Bank Name"
                  value={formData.bankName}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="accountHolderName"
                  label="Account Holder Name"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="accountNumber"
                  label="Account Number"
                  value={formData.accountNumber}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  required
                  name="ifscCode"
                  label="IFSC Code"
                  value={formData.ifscCode}
                  onChange={handleChange}
                />
              </Box>
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
            {isLoading ? "Onboarding..." : "Onboard Staff"}
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
