import React from "react";
import { Box, TextField, Alert } from "@mui/material";
import SubmitButton from "../../../components/SubmitButton";

export const LoginForm = ({
  formData,
  loading,
  error,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 1, width: "100%" }}
    >
      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="normal"
        required
        fullWidth
        label="Usuario o Email"
        name="username"
        value={formData.username}
        onChange={handleChange}
        disabled={loading}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
      />

      <SubmitButton loading={loading}>Acceder</SubmitButton>
    </Box>
  );
};

export default LoginForm;
