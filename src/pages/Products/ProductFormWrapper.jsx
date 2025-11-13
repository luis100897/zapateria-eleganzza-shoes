import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsForm } from "../../components/Products/ProductsForm";
import { Typography, CircularProgress, Box } from "@mui/material";
import productService from "../../api/productService";
import { useAuth } from "../../context/AuthContext";

const DEFAULT_INITIAL_DATA = { nombre: "", descripcion: "" };

export const ProductFormWrapper = () => {
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

    const loadProductData = async () => {
      try {
        setLoading(true);
        const productData = await productService.getProductById(id);
        setInitialData(productData);
      } catch (error) {
        setError(error.message || "Ocurrió un error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };
    loadProductData();
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
        await productService.updateProduct(id, data);
        setInitialData({ ...DEFAULT_INITIAL_DATA });
        setSuccess("Producto editado correctamente");
        setTimeout(() => navigate(`/${userRole}/productos/lista`), 2000);
      } else {
        await productService.createProduct(data);
        setInitialData(DEFAULT_INITIAL_DATA);
        setSuccess("Producto agregado correctamente");
        setTimeout(() => navigate(`/${userRole}/productos/lista`), 2000);
      }
    } catch (error) {
      setError(error.message || "Ha ocurrido un error al guardar");
    } finally {
      setIsSaving(false);
    }
  };
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando datos del empleado...</Typography>
      </Box>
    );
  }

  return (
    <ProductsForm
      title={
        isEditing ? `Editar Producto ID: ${id}` : "Registrar Nuevo Producto"
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
      isEditing={isEditing}
      successMessagge={success}
      errorMessagge={error}
      onErrorClear={handleClearError}
    />
  );
};
