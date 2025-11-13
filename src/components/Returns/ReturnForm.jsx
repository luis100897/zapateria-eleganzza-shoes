import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SaveIcon from "@mui/icons-material/Save";
import { SuccessMessage } from "../../components/SuccessMessage";
import { ErrorMessage } from "../../components/ErrorMessage";

export const ReturnForm = ({
  buttonText,
  onSubmit,
  disabled,
  title,
  initialData,
  successMessagge,
  errorMessagge,
  handleIdDetailSaleBlur,
  onErrorClear,
}) => {
  const metodos_devolucion = ["Efectivo", "Tarjeta"];

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    const cantidad = parseInt(formData.cantidad);
    const precio_unitario = parseFloat(formData.precio_unitario);
    if (!isNaN(cantidad) && !isNaN(precio_unitario) && cantidad >= 0) {
      const nuevoMontoReembolso = (cantidad * precio_unitario).toFixed(2);
      if (formData.monto_reembolso !== nuevoMontoReembolso) {
        setFormData((prevData) => ({
          ...prevData,
          monto_reembolso: nuevoMontoReembolso,
        }));
      } else if (formData.monto_reembolso !== "") {
        setFormData((prevData) => ({
          ...prevData,
          monto_reembolso: "",
        }));
      }
    }
  }, [formData.cantidad, formData.precio_unitario]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleBlur = (e) => {
    if (e.target.name === "id_detalle" && e.target.value) {
      handleIdDetailSaleBlur(e.target.value);
    }
  };

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
            label="ID detalle de la venta"
            name="id_detalle"
            value={formData.id_detalle}
            onBlur={handleBlur}
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
            label="Motivo de la devolución"
            name="motivo"
            value={formData.motivo}
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
            label="Cantidad en piezas"
            name="cantidad"
            value={formData.cantidad}
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
            disabled
            label="Precio Unitario"
            name="precio_unitario"
            type="text"
            value={formData.precio_unitario || ""}
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
            disabled
            label="Monto a reembolsar"
            name="monto_reembolsar"
            value={formData.monto_reembolso}
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
            disabled
            label="ID de la venta"
            name="id_venta"
            type="text"
            value={formData.id_venta}
            onChange={handleChange}
          />
        </Grid>

        <Grid
          sx={{
            width: { xs: "100%", sm: "40%" },
          }}
        >
          <FormControl fullWidth required>
            <InputLabel id="metodo_reembolso-label">
              Método de reembolso
            </InputLabel>
            <Select
              labelId="metodo_reembolso-label"
              id="metodo_reembolso-select"
              name="metodo_reembolso"
              value={formData.metodo_reembolso}
              label="metodo_reembolso"
              onChange={handleChange}
            >
              {metodos_devolucion.map((metodo) => (
                <MenuItem key={metodo} value={metodo}>
                  {metodo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
