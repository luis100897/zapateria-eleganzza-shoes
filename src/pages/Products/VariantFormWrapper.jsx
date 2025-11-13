import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, CircularProgress, Box } from "@mui/material";
import productService from "../../api/productService";
import { useAuth } from "../../context/AuthContext";
import { VariantsForm } from "../../components/Products/VariantsForm";

const DEFAULT_INITIAL_DATA = {
  talla: "",
  color: "",
  stock: "",
  id_articulo: "",
  precio: "",
};

export const VariantFormWrapper = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditing);
  const [initialData, setInitialData] = useState(DEFAULT_INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userRole = user?.rol;

  useEffect(() => {
    if (!isEditing) return;

    const loadVariantProduct = async () => {
      try {
        setLoading(true);
        const variantData = await productService.getVariantById(id);
        setInitialData(variantData);
      } catch (error) {
        setError(error.message || "Ocurrió un error al cargar las variantes.");
      } finally {
        setLoading(false);
      }
    };
    loadVariantProduct();
  }, [isEditing, id]);

  const handleClearError = () => {
    if (error) {
      setError(null);
    }
  };

  const handleFormSubmit = async (data) => {
    setIsSaving(true);
    try {
      if (isEditing) {
        await productService.updateVariant(id, data);
        setInitialData({ ...DEFAULT_INITIAL_DATA });
        setSuccess("Variante Actualizada con éxito");
        setTimeout(
          () => navigate(`/${userRole}/productos/variantes/lista`),
          1500
        );
      } else {
        await productService.createVariant(data);
        setInitialData({ ...DEFAULT_INITIAL_DATA });
        setSuccess("Variante creada correctamente");
        setTimeout(
          () => navigate(`/${userRole}/productos/variantes/lista`),
          1500
        );
      }
    } catch (error) {
      setError(error.message || "Ocurrió un error al guardar.");
    } finally {
      setIsSaving(false);
    }
  };
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando datos de la variante...</Typography>
      </Box>
    );
  }
  return (
    <VariantsForm
      title={
        isEditing ? `Editar variante ID: ${id}` : "Registrar Nueva Variante"
      }
      buttonText={
        isSaving
          ? "Guardando..."
          : isEditing
          ? "Guardar Cambios"
          : "Registrar Producto"
      }
      initialData={initialData}
      onSubmit={handleFormSubmit}
      loading={loading}
      disabled={isSaving}
      successMessagge={success}
      errorMessagge={error}
      onErrorClear={handleClearError}
    />
  );
};
