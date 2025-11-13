import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { SuccessMessage } from "../SuccessMessage";
import { ErrorMessage } from "../ErrorMessage";
export const ProductsForm = ({
  buttonText,
  onSubmit,
  disabled,
  title,
  initialData,
  successMessagge,
  errorMessagge,
  onErrorClear,
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    if (errorMessagge && onErrorClear) {
      onErrorClear();
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, bgcolor: "white", borderRadius: 2, boxShadow: 1 }}
    >
      <SuccessMessage message={successMessagge} />
      <ErrorMessage message={errorMessagge} />
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Grid container spacing={2.5}>
        <Grid
          sx={{
            width: { xs: "100%", sm: "40%" },
          }}
        >
          <TextField
            fullWidth
            required
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          sx={{
            width: { xs: "100%", sm: "40%" },
          }}
        >
          <TextField
            fullWidth
            required
            label="Descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        startIcon={<SaveIcon />}
        sx={{ mt: 4 }}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
