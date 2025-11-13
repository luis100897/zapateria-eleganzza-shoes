import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SalesForm } from "../../components/Sales/SalesForm";
import salesService from "../../api/salesService"; // Para crear la venta
import productsService from "../../api/productService";
import { useAuth } from "../../context/AuthContext";

const DEFAULT_INITIAL_DATA = {
  metodo_pago: "Efectivo",
  items: [
    {
      id_variante: "",
      id_articulo: "",
      talla: "",
      color: "",
      stock: "",
      cantidad: "0",
      precio_unitario: "",
    },
  ],
  total_venta_frontend: "0.00",
};

export const SaleFormWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(DEFAULT_INITIAL_DATA);
  const [searchingIndex, setSearchingIndex] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userRole = user?.rol;

  const isItemSearching = (index) => {
    searchingIndex === index;
  };

  const handleClearError = () => {
    if (error) setError(null);
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio_unitario) || 0;
      return acc + cantidad * precio;
    }, 0);
    return total.toFixed(2);
  };

  const handleSaleDataChange = (newSaleData) => {
    const newTotal = calculateTotal(newSaleData.items);

    setInitialData({
      ...newSaleData,
      total_venta_frontend: newTotal,
    });
  };

  const handleVariantSearch = async (index, variantId) => {
    if (!variantId || isItemSearching(index)) return;

    setSearchingIndex(index);
    handleClearError();

    const clearVariantFields = () => ({
      id_articulo: "",
      talla: "",
      color: "",
      stock: "",
      precio_unitario: "",
    });

    try {
      const response = await productsService.getVariantById(variantId);

      const details = response;

      const newDetails = {
        id_articulo: details.id_articulo || "",
        talla: details.talla || "",
        color: details.color || "",
        stock: String(details.stock) || "",
        precio_unitario: String(details.precio) || "",
      };

      const newItems = initialData.items.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            ...newDetails,
            cantidad: item.cantidad,
          };
        }

        return item;
      });

      handleSaleDataChange({ ...initialData, items: newItems });
    } catch (err) {
      setError(`Error al buscar variante ${variantId}. ${err.message}`);
      const newItems = initialData.items.map((item, i) => {
        if (i === index) {
          return { ...item, ...clearVariantFields() };
        }
        return item;
      });
      handleSaleDataChange({ ...initialData, items: newItems });
    } finally {
      setSearchingIndex(null);
    }
  };

  const handleFormSubmit = async () => {
    let hasValidationError = false;

    initialData.items.forEach((item, index) => {
      if (item.id_variante.trim() !== "" && item.cantidad <= 0) {
        setError(`El artículo ${index + 1} debe tener una cantidad válida.`);
        hasValidationError = true;
        return;
      }
    });

    if (hasValidationError) {
      return;
    }

    if (searchingIndex !== null) {
      setError(
        "Espere a que termine la búsqueda de la variante antes de guardar."
      );
      return;
    }

    const dataToSend = {
      metodo_pago: initialData.metodo_pago,
      items: initialData.items.map((item) => ({
        id_variante: item.id_variante,
        talla: item.talla,
        color: item.color,
        stock: item.stock,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario,
      })),
      total_venta_frontend: initialData.total_venta_frontend,
    };

    setIsSaving(true);
    try {
      await salesService.createSale(dataToSend);
      setSuccess("Venta registrada exitosamente.");
      setInitialData(DEFAULT_INITIAL_DATA);
      setTimeout(() => navigate(`/${userRole}/ventas/lista`), 2000);
    } catch (error) {
      setError(error.message || "Ha ocurrido un error al registrar la venta");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SalesForm
      title={"Registrar Nueva Venta"}
      buttonText={isSaving ? "Guardando..." : "Registrar Venta"}
      initialData={initialData}
      onSaleDataChange={handleSaleDataChange}
      onSubmit={handleFormSubmit}
      disabled={isSaving}
      successMessagge={success}
      errorMessagge={error}
      onErrorClear={handleClearError}
      handleVariantBlur={handleVariantSearch}
      isItemSearching={isItemSearching}
    />
  );
};
