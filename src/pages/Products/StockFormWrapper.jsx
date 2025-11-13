import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import productsService from "../../api/productService"; // Asegúrate de que este servicio tenga updateStock
import { StockForm } from "../../components/Products/StockForm";
import { useAuth } from "../../context/AuthContext";

const DEFAULT_VARIANT_DATA = {
  id_variante: 0,
  talla: "",
  color: "",
  stock: 0,
};

export const StockFormWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [variantData, setVariantData] = useState(DEFAULT_VARIANT_DATA);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const userRole = user?.rol;

  useEffect(() => {
    const loadVariantData = async () => {
      try {
        setLoading(true);
        const response = await productsService.getVariantById(id);
        setVariantData(response);
      } catch (error) {
        setError(error.message || "Ocurrió un error al cargar la variante.");
      } finally {
        setLoading(false);
      }
    };
    loadVariantData();
  }, []);

  const handleAddStockSubmit = async (stockToAdd) => {
    setIsSaving(true);
    try {
      const dataToSend = {
        cantidad: stockToAdd,
      };
      await productsService.updateStock(id, dataToSend);
      setSuccess(`Se agregaron ${stockToAdd} unidades exitosamente.`);
      setTimeout(
        () => navigate(`/${userRole}/productos/variantes/lista`),
        2000
      );
    } catch (error) {
      setError(error.message || "Ha ocurrido un error al actualizar el stock");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>
          Cargando información de la variante...
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      <StockForm
        variantData={variantData}
        onSubmit={handleAddStockSubmit}
        isSaving={isSaving}
        successMessagge={success}
        errorMessagge={error}
      />
    </Box>
  );
};
