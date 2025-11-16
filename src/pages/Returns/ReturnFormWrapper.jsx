import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeForm } from "../../components/Employees/EmployeesForm";
import { Typography, CircularProgress, Box } from "@mui/material";
import returnService from "../../api/returnService";
import { ReturnForm } from "../../components/Returns/ReturnForm";
import salesService from "../../api/salesService";
import { useAuth } from "../../context/AuthContext";

const DEFAULT_INITIAL_DATA = {
  id_detalle: "",
  metodo_reembolso: "Efectivo",
  id_venta: "",
  motivo: "",
  cantidad: "",
  monto_reembolso: "",
  precio_unitario: "",
};

export const ReturnFormWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(DEFAULT_INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userRole = user?.rol;

  const handleClearError = () => {
    if (error) {
      setError(null);
    }
  };

  const handleIdDetailSaleSearch = async (detailsId) => {
    handleClearError();
    const clearFields = {
      motivo: "",
      cantidad: "",
      precio_unitario: "",
      monto_reembolso: "",
      id_venta: "",
    };
    try {
      setLoading(true);
      const response = await salesService.getSaleDetailsByIdDetails(detailsId);
      const details = response;
      const newData = {
        id_venta: details.id_venta || "",
        precio_unitario: details.precio_unitario || "",
      };
      setInitialData((prevData) => ({
        ...prevData,
        ...newData,
        id_detalle: detailsId,
      }));
    } catch (error) {
      setError(error.message || "Ocurrio un error al obtener los datos");
      setInitialData({
        id_detalle: detailsId,
        ...clearFields,
        metodo_reembolso: initialData.metodo_reembolso,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      setIsSaving(true);
      console.log(data);
      await returnService.createReturn(data);
      setSuccess("Devolución registrada exitosamente.");
      setTimeout(() => navigate(`/${userRole}/devoluciones/lista`), 2000);
    } catch (error) {
      setError(error.message || "Ocurrió un error al registrar la venta");
    } finally {
      setIsSaving(false);
    }
  };
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando datos de la venta...</Typography>
      </Box>
    );
  }
  return (
    <ReturnForm
      title={"Registrar Nueva Devolución"}
      buttonText={isSaving ? "Guardando..." : "Registrar Devolución"}
      handleIdDetailSaleBlur={handleIdDetailSaleSearch}
      initialData={initialData}
      onSubmit={handleFormSubmit}
      disabled={isSaving}
      successMessagge={success}
      errorMessagge={error}
      onErrorClear={handleClearError}
    />
  );
};
