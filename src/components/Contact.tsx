"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  Chip,
  Stack,
} from "@mui/material";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "amreekbasra@basratechai.com",
    link: "mailto:amreekbasra@basratechai.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 (555) 123-4567",
    link: "tel:+915551234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "Mumbai, India",
    link: "#",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", company: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: 12,
        position: "relative",
        overflow: "hidden",
        background: (theme) => theme.palette.background.default,
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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <Box textAlign="center" maxWidth="md" mx="auto" mb={8}>
          <Chip
            label="Get In Touch"
            sx={{
              mb: 3,
              backgroundColor: "rgba(14, 165, 233, 0.1)",
              border: "1px solid rgba(14, 165, 233, 0.3)",
              color: "#22d3ee",
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 700, mb: 3 }}
          >
            <Box component="span" sx={{ color: "text.primary" }}>
              Ready to{" "}
            </Box>
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Transform?
            </Box>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Let&apos;s discuss how BasraTech AI can help you achieve your business
            goals with cutting-edge artificial intelligence solutions.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 8,
          }}
        >
          {/* Contact Info */}
          <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Contact Information
            </Typography>

            <Stack spacing={3}>
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  component={MuiLink}
                  href={info.link}
                  sx={{
                    textDecoration: "none",
                    backgroundColor: "rgba(17, 24, 39, 0.5)",
                    border: "1px solid #1f2937",
                    "&:hover": {
                      borderColor: "rgba(14, 165, 233, 0.3)",
                      "& .icon-container": {
                        background:
                          "linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(99, 102, 241, 0.3))",
                      },
                      "& .value": {
                        color: "#22d3ee",
                      },
                    },
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        className="icon-container"
                        sx={{
                          width: 48,
                          height: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 2,
                          background:
                            "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(99, 102, 241, 0.2))",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <info.icon size={24} style={{ color: "#22d3ee" }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {info.title}
                        </Typography>
                        <Typography
                          className="value"
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            transition: "color 0.3s ease",
                          }}
                        >
                          {info.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            {/* Additional info */}
            <Card
              sx={{
                mt: 3,
                background:
                  "linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(99, 102, 241, 0.1))",
                border: "1px solid rgba(14, 165, 233, 0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Schedule a Free Consultation
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Get a personalized demo and discover how our AI solutions can
                  benefit your specific use case.
                </Typography>
                <Button
                  endIcon={<ArrowRight size={16} />}
                  sx={{
                    color: "#22d3ee",
                    "&:hover": {
                      backgroundColor: "rgba(14, 165, 233, 0.1)",
                    },
                  }}
                >
                  Book a Meeting
                </Button>
              </CardContent>
            </Card>
          </Box>

          {/* Contact Form */}
          <Box>
            <Card
              sx={{
                backgroundColor: "#111827",
                border: "1px solid #1f2937",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                  Send Us a Message
                </Typography>

                {submitted ? (
                  <Box textAlign="center" py={6}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        mx: "auto",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: "rgba(34, 197, 94, 0.2)",
                      }}
                    >
                      <CheckCircle size={32} style={{ color: "#22c55e" }} />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      Message Sent!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Thank you for reaching out. We&apos;ll get back to you within
                      24 hours.
                    </Typography>
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
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
                          name="name"
                          label="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                        />
                        <TextField
                          fullWidth
                          required
                          type="email"
                          name="email"
                          label="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                        />
                      </Box>
                      <TextField
                        fullWidth
                        name="company"
                        label="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                      />
                      <TextField
                        fullWidth
                        required
                        multiline
                        rows={5}
                        name="message"
                        label="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                      />
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        endIcon={<Send size={20} />}
                        sx={{
                          background:
                            "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                          py: 1.5,
                          "&:hover": {
                            boxShadow: "0 10px 30px rgba(14, 165, 233, 0.3)",
                          },
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
