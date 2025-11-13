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
import { ErrorMessage } from "../../components/ErrorMessage";
import { useAuth } from "../../context/AuthContext";
import returnService from "../../api/returnService";

export const ReturnListPage = () => {
  const navigate = useNavigate();
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userRole = user?.rol;

  useEffect(() => {
    const fetchReturn = async () => {
      try {
        setLoading(true);
        const response = await returnService.getAllReturns();
        setReturns(response);
      } catch (error) {
        setError(
          error.message || "Ocurrió un error al obtener las devoluciones"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchReturn();
  }, []);

  const tableHeaders = [
    "ID",
    "Fecha de devolución",
    "Motivo",
    "Cantidad",
    "Método reembolso",
    "Monto reembolso",
    "ID Empleado",
    "ID Venta",
    "ID detalle",
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
          Lista de Devoluciones
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : returns.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          <ErrorMessage message={error} />
          No hay devoluciones registradas.
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
                {returns.map((e) => (
                  <TableRow
                    key={e.id_devolucion}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {e.id_devolucion}
                    </TableCell>
                    <TableCell>{e.fecha_devolucion}</TableCell>
                    <TableCell>{e.motivo}</TableCell>
                    <TableCell>{e.cantidad}</TableCell>
                    <TableCell>{e.monto_reembolso}</TableCell>
                    <TableCell>{e.metodo_reembolso}</TableCell>
                    <TableCell>{e.id_empleado}</TableCell>
                    <TableCell>{e.id_venta}</TableCell>
                    <TableCell>{e.id_detalle}</TableCell>
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
