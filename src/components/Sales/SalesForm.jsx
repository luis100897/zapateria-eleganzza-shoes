import React from "react";
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

const SaleItemFields = ({
  item,
  index,
  handleItemChange,
  handleRemoveItem,
  handleVariantBlur,
  isSearching,
}) => {
  const handleChange = (e) => {
    handleItemChange(index, e.target.name, e.target.value);
  };
  const handleBlur = (e) => {
    if (e.target.name === "id_variante" && e.target.value) {
      handleVariantBlur(index, e.target.value);
    }
  };

  return (
    <Box
      sx={{
        p: 1.5,
        mb: 1,
        border: "1px solid #ddd",
        borderRadius: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Artículo #{index + 1} {isSearching && "(Buscando...)"}
        </Typography>
        {index > 0 && ( // No permitir eliminar el primer ítem si queremos que siempre haya uno
          <Button
            onClick={() => handleRemoveItem(index)}
            variant="outlined"
            color="error"
            startIcon={<RemoveIcon />}
            size="small"
          >
            Remover
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid sx={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            required
            label="ID Variante"
            name="id_variante"
            type="text"
            value={item.id_variante}
            onBlur={handleBlur}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid sx={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            required
            disabled
            label="ID Articulo"
            name="id_articulo"
            type="text"
            value={item.id_articulo}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid sx={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Talla"
            name="talla"
            disabled
            value={item.talla}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid sx={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Color"
            name="color"
            disabled
            value={item.color}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid sx={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            label="Stock Actual"
            name="stock"
            disabled
            value={item.stock}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid sx={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            required
            type="number"
            label="Cantidad"
            name="cantidad"
            value={item.cantidad}
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid sx={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            required
            disabled
            label="Precio Unitario"
            name="precio_unitario"
            type="text"
            value={item.precio_unitario || 0}
            onChange={handleChange}
            size="small"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// --- Componente Principal SalesForm ---
export const SalesForm = ({
  buttonText,
  onSubmit,
  disabled,
  title,
  initialData,
  onSaleDataChange,
  successMessagge,
  errorMessagge,
  onErrorClear,
  handleVariantBlur,
  isItemSearching,
}) => {
  const metodos_pago = ["Efectivo", "Tarjeta"];

  const handleMetodoPagoChange = (e) => {
    if (errorMessagge && onErrorClear) {
      onErrorClear();
    }

    onSaleDataChange({ ...initialData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    if (errorMessagge && onErrorClear) {
      onErrorClear();
    }
    const newItems = initialData.items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onSaleDataChange({ ...initialData, items: newItems });
  };

  const handleAddItem = () => {
    if (errorMessagge && onErrorClear) {
      onErrorClear();
    }
    const newItem = {
      id_variante: "",
      id_articulo: "",
      talla: "",
      color: "",
      stock: "",
      cantidad: "0",
      precio_unitario: "",
    };
    onSaleDataChange({
      ...initialData,
      items: [...initialData.items, newItem],
    });
  };

  const handleRemoveItem = (index) => {
    if (errorMessagge && onErrorClear) {
      onErrorClear();
    }
    const newItems = initialData.items.filter((_, i) => i !== index);
    onSaleDataChange({ ...initialData, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ m: 0, p: 2, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}
    >
      <SuccessMessage message={successMessagge} />
      <ErrorMessage message={errorMessagge} />

      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: 1.5, fontWeight: "bold" }}
      >
        {title}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 1 }}>
        <Grid sx={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth required size="small">
            <InputLabel id="metodo_pago-label">Método de Pago</InputLabel>
            <Select
              labelId="metodo_pago-label"
              id="metodo_pago-select"
              name="metodo_pago"
              value={initialData.metodo_pago}
              label="Método de Pago"
              onChange={handleMetodoPagoChange}
            >
              {metodos_pago.map((metodo) => (
                <MenuItem key={metodo} value={metodo}>
                  {metodo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Divider sx={{ my: 1.5 }} />

      <Typography variant="h6" gutterBottom sx={{ mb: 1, fontWeight: "600" }}>
        Artículos a Vender
      </Typography>

      {initialData.items.map((item, index) => (
        <SaleItemFields
          key={index}
          item={item}
          index={index}
          handleItemChange={handleItemChange}
          handleRemoveItem={handleRemoveItem}
          handleVariantBlur={handleVariantBlur}
          isSearching={isItemSearching(index)}
        />
      ))}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddItem}
        sx={{
          mt: 1,
          mb: 1,
          bgcolor: "#4caf50",
          "&:hover": { bgcolor: "#388e3c" },
        }}
      >
        Agregar Otro Artículo
      </Button>

      <Divider sx={{ my: 1 }} />

      <Grid container justifyContent="space-between" sx={{ mt: 3, mb: 1 }}>
        <Grid>
          <Typography variant="h6">
            Total productos: {initialData.items.length}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h5" color="primary">
            Total a Pagar: ${initialData.total_venta_frontend}
          </Typography>
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        startIcon={<SaveIcon />}
        sx={{ mt: 1, py: 1 }}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
