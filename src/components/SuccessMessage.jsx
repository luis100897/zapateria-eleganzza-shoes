import React from "react";
import { Alert } from "@mui/material";

export const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <Alert severity="success" sx={{ my: 2 }}>
      {message}
    </Alert>
  );
};
