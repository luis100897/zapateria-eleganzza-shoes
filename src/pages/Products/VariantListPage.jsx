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
import productsService from "../../api/productService";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

export const VariantListPage = () => {
  const navigate = useNavigate();
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userRole = user?.rol;

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        setLoading(true);
        const response = await productsService.getAllVariants();
        setVariants(response);
      } catch (error) {
        setError("Error al obtener la lista de variantes");
      } finally {
        setLoading(false);
      }
    };
    fetchVariants();
  }, []);

  const handleEdit = (varianteId) => {
    navigate(`/${userRole}/productos/variantes/editar/${varianteId}`);
  };

  const handleAddStock = (varianteId) => {
    navigate(`/${userRole}/productos/variantes/${varianteId}/stock`);
  };

  const handleNavigateToCreate = () => {
    navigate(`/${userRole}/productos/variantes/agregar`);
  };

  const tableHeaders = [
    "ID",
    "Talla",
    "Color",
    "Stock",
    "ID articulo",
    "Precio",
    "Editar",
    "Agregar stock",
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
          Lista de Variantes
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
          Agregar Variante
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : variants.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          <ErrorMessage message={error} />
          No hay variantes registradas.
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
                {variants.map((variant) => (
                  <TableRow
                    key={variant.id_variante}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {variant.id_variante}
                    </TableCell>
                    <TableCell>{variant.talla}</TableCell>
                    <TableCell>{variant.color}</TableCell>
                    <TableCell>{variant.stock}</TableCell>
                    <TableCell>{variant.id_articulo}</TableCell>
                    <TableCell>{variant.precio}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(variant.id_variante)}
                        sx={{
                          bgcolor: "#4caf50",
                          "&:hover": { bgcolor: "#388e3c" },
                        }}
                      >
                        Editar
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleAddStock(variant.id_variante)}
                        sx={{
                          bgcolor: "#4caf50",
                          "&:hover": { bgcolor: "#388e3c" },
                        }}
                      >
                        + stock
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
