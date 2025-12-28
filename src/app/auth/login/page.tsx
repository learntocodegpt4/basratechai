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
} from "@mui/material";
import { Mail, Lock } from "lucide-react";
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login - replace with actual authentication
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    // Redirect to dashboard or show error
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth
    console.log("Google login");
  };

  const handleMicrosoftLogin = () => {
    // Implement Microsoft OAuth
    console.log("Microsoft login");
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
              BasraTech AI
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account
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
                onClick={handleGoogleLogin}
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
                onClick={handleMicrosoftLogin}
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
                Or continue with email
              </Typography>
            </Divider>

            {/* Email/Password Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  InputProps={{
                    startAdornment: <Mail size={20} style={{ marginRight: 8, color: "#9ca3af" }} />,
                  }}
                />
                <TextField
                  fullWidth
                  required
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  InputProps={{
                    startAdornment: <Lock size={20} style={{ marginRight: 8, color: "#9ca3af" }} />,
                  }}
                />

                <Box textAlign="right">
                  <MuiLink
                    component={Link}
                    href="#"
                    sx={{
                      fontSize: "0.875rem",
                      color: "#22d3ee",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot password?
                  </MuiLink>
                </Box>

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
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </Stack>
            </Box>

            {/* Register Link */}
            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary">
                Don&apos;t have an account?{" "}
                <MuiLink
                  component={Link}
                  href="/auth/register"
                  sx={{
                    color: "#22d3ee",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign up
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
