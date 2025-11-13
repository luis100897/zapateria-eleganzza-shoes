import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeForm } from "../../components/Employees/EmployeesForm";
import { Typography, CircularProgress, Box } from "@mui/material";
import {
  getEmployeeById,
  createEmployee,
  updateEmployee,
} from "../../api/employeeService";
const DEFAULT_INITIAL_DATA = {
  nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  telefono: "",
  direccion: "",
  password: "",
  id_tipo_empleado: 1,
  status: "activo",
  username: "",
};

export const EmployeeFormWrapper = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEditing);
  const [initialData, setInitialData] = useState(DEFAULT_INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleClearError = () => {
    if (error) {
      setError(null);
    }
  };

  useEffect(() => {
    if (!isEditing) return;

    const loadEmployeeData = async () => {
      try {
        setLoading(true);
        const employeeData = await getEmployeeById(id);
        setInitialData(employeeData);
      } catch (error) {
        setError(error.message || "Ocurrió un error al guardar.");
      } finally {
        setLoading(false);
      }
    };
    loadEmployeeData();
  }, [isEditing, id]);

  const handleFormSubmit = async (data) => {
    setIsSaving(true);
    try {
      if (isEditing) {
        await updateEmployee(id, data);
        setInitialData({ ...DEFAULT_INITIAL_DATA });
        setSuccess("Empleado editado correctamente");
        setTimeout(() => navigate("/gerente/empleados/lista"), 1500);
      } else {
        await createEmployee(data);
        setInitialData({ ...DEFAULT_INITIAL_DATA });
        setSuccess("Empleado creado correctamente");
        setTimeout(() => navigate("/gerente/empleados/lista"), 1500);
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
        <Typography sx={{ ml: 2 }}>Cargando datos del empleado...</Typography>
      </Box>
    );
  }

  return (
    <EmployeeForm
      title={
        isEditing ? `Editar Empleado ID: ${id}` : "Registrar Nuevo Empleado"
      }
      buttonText={
        isSaving
          ? "Guardando..."
          : isEditing
          ? "Guardar Cambios"
          : "Registrar Empleado"
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
