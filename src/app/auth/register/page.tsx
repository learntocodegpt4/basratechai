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
  Divider,
  Link as MuiLink,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Mail, Lock, User } from "lucide-react";
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);

    // Simulate registration - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    // Redirect to login or dashboard
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1, py: 8 }}>
        {/* Logo */}
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
              Create Account
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join BasraTech AI today
          </Typography>
        </Box>

        <Card
          sx={{
            backgroundColor: "#111827",
            border: "1px solid #1f2937",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* OAuth Buttons */}
            <Stack spacing={2} mb={3}>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<GoogleIcon />}
                sx={{
                  borderColor: "#374151",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "#0ea5e9",
                    backgroundColor: "rgba(14, 165, 233, 0.1)",
                  },
                }}
              >
                Continue with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<MicrosoftIcon />}
                sx={{
                  borderColor: "#374151",
                  color: "text.primary",
                  "&:hover": {
                    borderColor: "#0ea5e9",
                    backgroundColor: "rgba(14, 165, 233, 0.1)",
                  },
                }}
              >
                Continue with Microsoft
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Or register with email
              </Typography>
            </Divider>

            {/* Registration Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  InputProps={{
                    startAdornment: <User size={20} style={{ marginRight: 8, color: "#9ca3af" }} />,
                  }}
                />
                <TextField
                  fullWidth
                  required
                  type="email"
                  name="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  InputProps={{
                    startAdornment: <Mail size={20} style={{ marginRight: 8, color: "#9ca3af" }} />,
                  }}
                />
                <TextField
                  fullWidth
                  required
                  type="password"
                  name="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  InputProps={{
                    startAdornment: <Lock size={20} style={{ marginRight: 8, color: "#9ca3af" }} />,
                  }}
                />
                <TextField
                  fullWidth
                  required
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  InputProps={{
                    startAdornment: <Lock size={20} style={{ marginRight: 8, color: "#9ca3af" }} />,
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      sx={{
                        color: "#374151",
                        "&.Mui-checked": {
                          color: "#0ea5e9",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      I agree to the{" "}
                      <MuiLink href="#" sx={{ color: "#22d3ee" }}>
                        Terms of Service
                      </MuiLink>{" "}
                      and{" "}
                      <MuiLink href="#" sx={{ color: "#22d3ee" }}>
                        Privacy Policy
                      </MuiLink>
                    </Typography>
                  }
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    background:
                      "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                    py: 1.5,
                    "&:hover": {
                      boxShadow: "0 10px 30px rgba(14, 165, 233, 0.3)",
                    },
                  }}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </Stack>
            </Box>

            {/* Login Link */}
            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <MuiLink
                  component={Link}
                  href="/auth/login"
                  sx={{
                    color: "#22d3ee",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign in
                </MuiLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <Box textAlign="center" mt={3}>
          <MuiLink
            component={Link}
            href="/"
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              fontSize: "0.875rem",
              "&:hover": {
                color: "#22d3ee",
              },
            }}
          >
            ← Back to Home
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}
