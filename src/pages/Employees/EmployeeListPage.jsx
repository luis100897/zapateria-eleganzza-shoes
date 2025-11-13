import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import { getAllEmployees } from "../../api/employeeService";
import { ErrorMessage } from "../../components/ErrorMessage";

export const EmployeeListPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await getAllEmployees();
        setEmployees(response);
      } catch (error) {
        setError(error.message || "Ocurrió un error al obtener los empleados");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleEdit = (employeeId) => {
    navigate(`/gerente/empleados/editar/${employeeId}`);
  };
  const handleNavigateToCreate = () => {
    navigate("/gerente/empleados/agregar");
  };
  const tableHeaders = [
    "ID",
    "Nombre",
    "Teléfono",
    "Dirección",
    "Username",
    "Rol",
    "Estado",
    "Acciones",
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Lista de Empleados
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleNavigateToCreate}
          sx={{
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Agregar Empleado
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : employees.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          <ErrorMessage message={error} />
          No hay empleados registrados.
        </Typography>
      ) : (
        <Paper elevation={3}>
          <TableContainer sx={{ maxHeight: 390, overflowY: "auto" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ bgcolor: "primary.light" }}>
                  {tableHeaders.map((header) => (
                    <TableCell
                      key={header}
                      sx={{ fontWeight: "bold", color: "primary.contrastText" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow
                    key={employee.id_empleado}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {employee.id_empleado}
                    </TableCell>
                    <TableCell>
                      {employee.nombre} {employee.apellido_paterno}{" "}
                      {employee.apellido_materno}
                    </TableCell>
                    <TableCell>{employee.telefono}</TableCell>
                    <TableCell>{employee.direccion}</TableCell>
                    <TableCell>{employee.username}</TableCell>
                    <TableCell>{employee.id_tipo_empleado}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: employee.status === "activo" ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {employee.status.toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(employee.id_empleado)}
                        sx={{
                          bgcolor: "#4caf50",
                          "&:hover": { bgcolor: "#388e3c" },
                        }}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};
