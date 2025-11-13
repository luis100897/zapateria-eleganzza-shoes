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
import productService from "../../api/productService";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

export const ProductListPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userRole = user?.rol;

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAllProducts();
        setProducts(response);
      } catch (error) {
        setError(error.message || "Ocurrió un error al obtener los empleados");
      } finally {
        setLoading(false);
      }
    };
    fecthProducts();
  }, []);

  const handleEdit = (ProductId) => {
    navigate(`/${userRole}/productos/editar/${ProductId}`);
  };

  const handleNavigateToCreate = () => {
    navigate(`/${userRole}/productos/agregar`);
  };

  const tableHeaders = ["ID", "Nombre", "Descripción", "Acciones"];
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
          Lista de Productos
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
          Agregar Producto
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          <ErrorMessage message={error} />
          No hay productos registrados.
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
                {products.map((product) => (
                  <TableRow
                    key={product.id_articulo}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {product.id_articulo}
                    </TableCell>
                    <TableCell>{product.nombre}</TableCell>
                    <TableCell>{product.descripcion}</TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(product.id_articulo)}
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
