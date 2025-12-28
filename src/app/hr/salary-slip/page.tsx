"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { FileText, Download } from "lucide-react";
import Image from "next/image";
import { jsPDF } from "jspdf";

export default function SalarySlipPage() {
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    department: "",
    month: "",
    year: "",
    basicSalary: "",
    hra: "",
    conveyance: "",
    otherAllowances: "",
    workDays: "26",
    leaveDays: "0",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  const companyDetails = {
    name: "BasraTech AI",
    address: "Mumbai, India",
    gstin: "27AABCU9603R1ZM", // Example GSTIN
    proprietor: "Amreek Basra",
    email: "amreekbasra@basratechai.com",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotals = () => {
    const basic = parseFloat(formData.basicSalary) || 0;
    const hra = parseFloat(formData.hra) || 0;
    const conveyance = parseFloat(formData.conveyance) || 0;
    const other = parseFloat(formData.otherAllowances) || 0;
    const grossSalary = basic + hra + conveyance + other;
    const pf = basic * 0.12; // 12% PF
    const tax = grossSalary * 0.1; // 10% tax (simplified)
    const netSalary = grossSalary - pf - tax;

    return { grossSalary, pf, tax, netSalary };
  };

  const generatePDF = () => {
    setIsGenerating(true);
    const { grossSalary, pf, tax, netSalary } = calculateTotals();

    const doc = new jsPDF();

    // Company Letterhead
    doc.setFillColor(10, 22, 40);
    doc.rect(0, 0, 210, 40, "F");

    // Logo (if available)
    doc.setFontSize(24);
    doc.setTextColor(34, 211, 238);
    doc.text(companyDetails.name, 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175);
    doc.text(companyDetails.address, 105, 27, { align: "center" });
    doc.text(`GSTIN: ${companyDetails.gstin}`, 105, 32, { align: "center" });
    doc.text(`Proprietor: ${companyDetails.proprietor}`, 105, 37, {
      align: "center",
    });

    // Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("SALARY SLIP", 105, 55, { align: "center" });

    // Employee Details
    doc.setFontSize(11);
    let yPos = 70;

    doc.text(`Employee Name: ${formData.employeeName}`, 20, yPos);
    doc.text(`Employee ID: ${formData.employeeId}`, 20, (yPos += 7));
    doc.text(`Designation: ${formData.designation}`, 20, (yPos += 7));
    doc.text(`Department: ${formData.department}`, 20, (yPos += 7));
    doc.text(
      `Pay Period: ${formData.month} ${formData.year}`,
      20,
      (yPos += 7)
    );
    doc.text(`Work Days: ${formData.workDays}`, 20, (yPos += 7));
    doc.text(`Leave Days: ${formData.leaveDays}`, 20, (yPos += 7));

    // Earnings and Deductions Table
    yPos += 15;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, 170, 10, "F");

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EARNINGS", 30, yPos + 7);
    doc.text("DEDUCTIONS", 120, yPos + 7);

    yPos += 15;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // Earnings
    doc.text("Basic Salary", 25, yPos);
    doc.text(`₹${formData.basicSalary}`, 80, yPos, { align: "right" });

    doc.text("Provident Fund", 115, yPos);
    doc.text(`₹${pf.toFixed(2)}`, 175, yPos, { align: "right" });

    yPos += 7;
    doc.text("HRA", 25, yPos);
    doc.text(`₹${formData.hra}`, 80, yPos, { align: "right" });

    doc.text("Tax", 115, yPos);
    doc.text(`₹${tax.toFixed(2)}`, 175, yPos, { align: "right" });

    yPos += 7;
    doc.text("Conveyance", 25, yPos);
    doc.text(`₹${formData.conveyance}`, 80, yPos, { align: "right" });

    yPos += 7;
    doc.text("Other Allowances", 25, yPos);
    doc.text(`₹${formData.otherAllowances}`, 80, yPos, { align: "right" });

    // Totals
    yPos += 15;
    doc.setFont("helvetica", "bold");
    doc.text("Gross Salary", 25, yPos);
    doc.text(`₹${grossSalary.toFixed(2)}`, 80, yPos, { align: "right" });

    doc.text("Total Deductions", 115, yPos);
    doc.text(`₹${(pf + tax).toFixed(2)}`, 175, yPos, { align: "right" });

    yPos += 10;
    doc.setFillColor(10, 22, 40);
    doc.rect(20, yPos, 170, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("NET SALARY", 30, yPos + 7);
    doc.text(`₹${netSalary.toFixed(2)}`, 175, yPos + 7, { align: "right" });

    // Footer
    yPos += 25;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.text(
      "This is a computer-generated document and does not require a signature.",
      105,
      yPos,
      { align: "center" }
    );

    // Save PDF
    doc.save(
      `salary_slip_${formData.employeeName}_${formData.month}_${formData.year}.pdf`
    );

    setIsGenerating(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePDF();
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

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: "auto",
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
              Generate Salary Slip
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            HR Management System - Admin Only
          </Typography>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Salary slip generated successfully!
          </Alert>
        )}

        <Card
          sx={{
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <FileText size={24} style={{ color: "#22d3ee" }} />
              <Typography variant="h6" fontWeight={600}>
                Employee & Salary Details
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* Employee Details */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    required
                    name="employeeName"
                    label="Employee Name"
                    value={formData.employeeName}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    required
                    name="employeeId"
                    label="Employee ID"
                    value={formData.employeeId}
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
                    name="month"
                    label="Month"
                    value={formData.month}
                    onChange={handleChange}
                    placeholder="January"
                  />
                  <TextField
                    fullWidth
                    required
                    name="year"
                    label="Year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2024"
                  />
                </Box>

                {/* Salary Components */}
                <Typography variant="subtitle1" fontWeight={600} mt={2}>
                  Salary Components
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    required
                    name="basicSalary"
                    label="Basic Salary (₹)"
                    type="number"
                    value={formData.basicSalary}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    required
                    name="hra"
                    label="HRA (₹)"
                    type="number"
                    value={formData.hra}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    required
                    name="conveyance"
                    label="Conveyance (₹)"
                    type="number"
                    value={formData.conveyance}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    name="otherAllowances"
                    label="Other Allowances (₹)"
                    type="number"
                    value={formData.otherAllowances}
                    onChange={handleChange}
                  />
                </Box>

                {/* Work Days */}
                <Typography variant="subtitle1" fontWeight={600} mt={2}>
                  Attendance
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    required
                    name="workDays"
                    label="Work Days"
                    type="number"
                    value={formData.workDays}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    required
                    name="leaveDays"
                    label="Leave Days"
                    type="number"
                    value={formData.leaveDays}
                    onChange={handleChange}
                  />
                </Box>

                {/* Summary */}
                {formData.basicSalary && (
                  <Card
                    sx={{
                      mt: 2,
                      background:
                        "linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(99, 102, 241, 0.1))",
                      border: "1px solid rgba(14, 165, 233, 0.2)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        Salary Summary
                      </Typography>
                      <Stack spacing={1} mt={2}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="body2" color="text.secondary">
                            Gross Salary
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            ₹{calculateTotals().grossSalary.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="body2" color="text.secondary">
                            Net Salary
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              background:
                                "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #6366f1 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            ₹{calculateTotals().netSalary.toFixed(2)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                )}

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isGenerating}
                  startIcon={<Download size={20} />}
                  sx={{
                    mt: 3,
                    background:
                      "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                    py: 1.5,
                    "&:hover": {
                      boxShadow: "0 10px 30px rgba(14, 165, 233, 0.3)",
                    },
                  }}
                >
                  {isGenerating
                    ? "Generating PDF..."
                    : "Generate Salary Slip PDF"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
