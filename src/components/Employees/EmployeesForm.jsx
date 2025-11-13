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
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { SuccessMessage } from "../SuccessMessage";
import { ErrorMessage } from "../ErrorMessage";
const ROLES = [
  { id: 1, nombre: "vendedor" },
  { id: 2, nombre: "gerente" },
  { id: 3, nombre: "cajero" },
];
const ESTADOS = ["activo", "inactivo"];

export const EmployeeForm = ({
  buttonText,
  onSubmit,
  disabled,
  title,
  initialData,
  isEditing,
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
            disabled={disabled}
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
            label="Apellido paterno"
            name="apellido_paterno"
            disabled={disabled}
            value={formData.apellido_paterno}
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
            label="Apellido Materno"
            name="apellido_materno"
            disabled={disabled}
            value={formData.apellido_materno}
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
            label="Teléfono"
            name="telefono"
            type="number"
            disabled={disabled}
            value={formData.telefono}
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
            label="Dirección"
            name="direccion"
            disabled={disabled}
            value={formData.direccion}
            onChange={handleChange}
          />
        </Grid>
        {!isEditing && (
          <Grid
            sx={{
              width: { xs: "100%", sm: "40%" },
            }}
          >
            <TextField
              fullWidth
              required
              label="Contraseña"
              name="password"
              type="password"
              disabled={disabled}
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
        )}
        <Grid
          sx={{
            width: { xs: "100%", sm: "40%" },
          }}
        >
          <FormControl fullWidth required>
            <InputLabel id="id_tipo_empleado-label">Rol</InputLabel>
            <Select
              labelId="id_tipo_empleado-label"
              id="id_tipo_empleado-select"
              name="id_tipo_empleado"
              value={formData.id_tipo_empleado}
              label="id_tipo_empleado"
              onChange={handleChange}
              disabled={disabled}
            >
              {ROLES.map((rol) => (
                <MenuItem key={rol.id} value={rol.id}>
                  {rol.nombre.charAt(0).toUpperCase() + rol.nombre.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          sx={{
            width: { xs: "100%", sm: "40%" },
          }}
        >
          <FormControl fullWidth required>
            <InputLabel id="status-label">status</InputLabel>
            <Select
              labelId="status-label"
              id="status-select"
              name="status"
              value={formData.status}
              label="status"
              onChange={handleChange}
              disabled={disabled}
            >
              {ESTADOS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          sx={{
            width: { xs: "100%", sm: "40%" },
          }}
        >
          <TextField
            fullWidth
            required
            label="usuario"
            name="username"
            type="text"
            disabled={disabled}
            value={formData.username}
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
