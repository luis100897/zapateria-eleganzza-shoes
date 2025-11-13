import React from "react";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const DashboardLayout = () => {
  const DRAWER_WIDTH = 250;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          px: 2,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: "200px", sm: "0px" },
          minHeight: "100vh",
          bgcolor: "#f4f6f8",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
