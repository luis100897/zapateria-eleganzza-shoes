import React from "react";
import { Alert } from "@mui/material";

export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <Alert severity="error" sx={{ my: 2 }}>
      {message}
    </Alert>
  );
};
