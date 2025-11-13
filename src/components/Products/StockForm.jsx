import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { SuccessMessage } from "../SuccessMessage";
import { ErrorMessage } from "../ErrorMessage";

export const StockForm = ({
  variantData,
  onSubmit,
  isSaving,
  successMessagge,
  errorMessagge,
}) => {
  const [cantidad, setCantidad] = useState("");
  const handleSubmit = (e) => {
    const stockToAdd = cantidad;
    e.preventDefault();
    onSubmit(stockToAdd);
    setCantidad("");
  };
  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <SuccessMessage message={successMessagge} />
      <ErrorMessage message={errorMessagge} />
      <Typography variant="h5" component="h2" gutterBottom>
        Agregar Stock a Variantes
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        ID de la variante: {variantData.id_variante} -- Talla:{" "}
        {variantData.talla} -- Color: {variantData.color} -- Stock Actual: {""}
        {variantData.stock}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          fullWidth
          required
          label="Cantidad a Agregar"
          name="cantidad"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          margin="normal"
          helperText="Introduce la cantidad de unidades que estás recibiendo."
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          startIcon={<AddCircleIcon />}
          disabled={isSaving || !cantidad || parseInt(cantidad, 10) <= 0}
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: "#007bff",
            "&:hover": { bgcolor: "#0056b3" },
          }}
        >
          {isSaving ? "Guardando..." : "Confirmar Recepción"}
        </Button>
      </Box>
    </Paper>
  );
};
