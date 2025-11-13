import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import salesService from "../../api/salesService";

export const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesDetails, setSalesDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await salesService.getSaleDetailsByIdSale(id);
        setSalesDetails(response);
      } catch (error) {
        setError(
          error.message ||
            "Ocurrió un error al obtener los detalles de  la venta"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, []);

  const tableHeaders = [
    "ID",
    "Cantidad",
    "Precio unitario",
    "subtotal",
    "ID venta",
    "ID variante",
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
          Lista de detalles de la venta
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : salesDetails.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          <ErrorMessage message={error} />
          No hay ventas registradas.
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
                      sx={{
                        fontWeight: "bold",
                        color: "primary.contrastText",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {salesDetails.map((detail) => (
                  <TableRow
                    key={detail.id_detalle}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {detail.id_detalle}
                    </TableCell>
                    <TableCell>{detail.cantidad}</TableCell>
                    <TableCell>{detail.precio_unitario}</TableCell>
                    <TableCell>{detail.subtotal}</TableCell>
                    <TableCell>{detail.id_venta}</TableCell>
                    <TableCell>{detail.id_variante}</TableCell>
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
