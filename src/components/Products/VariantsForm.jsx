import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { SuccessMessage } from "../SuccessMessage";
import { ErrorMessage } from "../ErrorMessage";

export const VariantsForm = ({
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
            label="Talla"
            name="talla"
            value={formData.talla}
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
            label="Color"
            name="color"
            value={formData.color}
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
            label="Stock"
            name="stock"
            value={formData.stock}
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
            label="ID del articulo"
            name="id_articulo"
            value={formData.id_articulo}
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
            label="Precio"
            name="precio"
            value={formData.precio}
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
