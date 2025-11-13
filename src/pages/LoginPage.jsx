import React from "react";
import { Container, Typography, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLoginForm } from "../hooks/useLoginForm";
import { LoginForm } from "../features/auth/components/LoginForm";

export const LoginPage = () => {
  const { formData, loading, error, handleChange, handleSubmit } =
    useLoginForm();

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}
      >
        Sistema de control de la zapatería Eleganzza Shoes
      </Typography>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <LockOutlinedIcon color="primary" sx={{ m: 1 }} fontSize="large" />

          <LoginForm
            formData={formData}
            loading={loading}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Container>
    </>
  );
};
