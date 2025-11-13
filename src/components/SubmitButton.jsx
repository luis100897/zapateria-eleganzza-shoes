import React from "react";
import { Button, CircularProgress } from "@mui/material";

export const SubmitButton = ({ loading, children, ...props }) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={loading}
      sx={{ mt: 3, mb: 2 }}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default SubmitButton;
