import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";

const ActionCard = ({ title, icon, color, onClick }) => (
  <Grid
    sx={{
      width: "100%",
      "@media (min-width: 600px)": {
        width: "33.3333%",
      },
      "@media (min-width: 900px)": {
        width: "22.3333%",
      },
    }}
  >
    <Paper
      onClick={onClick}
      sx={{
        p: 3,
        textAlign: "center",
        bgcolor: color,
        color: "white",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        height: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box sx={{ fontSize: 40, mb: 1 }}>{icon}</Box>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Paper>
  </Grid>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, rol } = useAuth();

  const baseRoute = rol ? `/${rol.toLowerCase()}` : "";

  const handleNavigate = (path) => {
    navigate(`${baseRoute}${path}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom p={2}>
        ¡Buenos días, {user?.nombre || user?.username}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        ¿Qué va a hacer el día de hoy?
      </Typography>

      <Grid container spacing={4}>
        <ActionCard
          title="Generar Venta"
          icon={<PointOfSaleIcon fontSize="inherit" />}
          color="#4DD0E1"
          onClick={() => handleNavigate("/ventas/nueva")}
        />

        <ActionCard
          title="Lista Productos"
          icon={<InventoryIcon fontSize="inherit" />}
          color="#7e7878ff"
          onClick={() => handleNavigate("/productos/lista")}
        />

        <ActionCard
          title="Consultar Ventas"
          icon={<ListAltIcon fontSize="inherit" />}
          color="#518607ff"
          onClick={() => handleNavigate("/ventas/lista")}
        />
        <ActionCard
          title="Revisar stock"
          icon={<InventoryTwoToneIcon fontSize="inherit" />}
          color="#8f65faff"
          onClick={() => handleNavigate("/inventaros/lista")}
        />
      </Grid>
    </Box>
  );
};
