"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Features", href: "#features" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isScrolled
          ? "rgba(10, 22, 40, 0.95)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        boxShadow: isScrolled ? "0 10px 30px rgba(14, 165, 233, 0.1)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 80, justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={Link}
            href="#home"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 48,
                height: 48,
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <Image
                src="/Main_Logo.png"
                alt="BasraTech AI Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                BasraTech AI
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#22d3ee",
                  letterSpacing: 2,
                  fontSize: "0.625rem",
                }}
              >
                FUTURE READY
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Stack
            direction="row"
            spacing={4}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                href={link.href}
                sx={{
                  color: "#d1d5db",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    color: "#22d3ee",
                    backgroundColor: "transparent",
                  },
                  transition: "color 0.3s ease",
                }}
              >
                {link.name}
              </Button>
            ))}
          </Stack>

          {/* CTA Button */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button
              component={Link}
              href="#contact"
              variant="contained"
              sx={{
                px: 3,
                py: 1.25,
                background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                borderRadius: "50px",
                fontWeight: 600,
                fontSize: "0.875rem",
                textTransform: "none",
                "&:hover": {
                  boxShadow: "0 10px 30px rgba(14, 165, 233, 0.3)",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
              color: "white",
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(10, 22, 40, 0.98)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(14, 165, 233, 0.2)",
            mt: 10,
          },
        }}
      >
        <Box sx={{ width: "auto", p: 3 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.name} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  sx={{
                    py: 1.5,
                    color: "#d1d5db",
                    "&:hover": {
                      color: "#22d3ee",
                      backgroundColor: "rgba(14, 165, 233, 0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={link.name}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button
            component={Link}
            href="#contact"
            variant="contained"
            fullWidth
            onClick={() => setIsMobileMenuOpen(false)}
            sx={{
              mt: 2,
              py: 1.5,
              background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                boxShadow: "0 10px 30px rgba(14, 165, 233, 0.3)",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
