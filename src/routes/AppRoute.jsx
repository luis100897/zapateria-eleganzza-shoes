import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Dashboard } from "../pages/Users/Dashboard";
import { PrivateRoute } from "./PrivateRoute";
import { RoleRoute } from "./RoleRoute";
import { EmployeeFormWrapper } from "../pages/Employees/EmployeeFormWrapper";
import { EmployeeListPage } from "../pages/Employees/EmployeeListPage";
import { ProductFormWrapper } from "../pages/Products/ProductFormWrapper";
import { ProductListPage } from "../pages/Products/ProductListPage";
import { VariantFormWrapper } from "../pages/Products/VariantFormWrapper";
import { VariantListPage } from "../pages/Products/VariantListPage";
import { StockFormWrapper } from "../pages/Products/StockFormWrapper";
import { SaleFormWrapper } from "../pages/Sales/SaleFormWrapper";
import { SaleListPage } from "../pages/Sales/SalesListPage";
import { DetailsPage } from "../pages/Sales/DetailsPage";
import { ReturnFormWrapper } from "../pages/Returns/ReturnFormWrapper";
import { ReturnListPage } from "../pages/Returns/ReturnsListPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/:role"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <Dashboard />
              </RoleRoute>
            }
          />
          <Route
            path="empleados/agregar"
            element={
              <RoleRoute allowedRoles={["gerente"]}>
                <EmployeeFormWrapper />
              </RoleRoute>
            }
          />

          <Route
            path="empleados/editar/:id"
            element={
              <RoleRoute allowedRoles={["gerente"]}>
                <EmployeeFormWrapper />
              </RoleRoute>
            }
          />
          <Route
            path="empleados/lista"
            element={
              <RoleRoute allowedRoles={["gerente"]}>
                <EmployeeListPage />
              </RoleRoute>
            }
          />
          <Route
            path="productos/agregar"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <ProductFormWrapper />
              </RoleRoute>
            }
          />
          <Route
            path="productos/editar/:id"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <ProductFormWrapper />
              </RoleRoute>
            }
          />
          <Route
            path="productos/lista"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <ProductListPage />
              </RoleRoute>
            }
          />
          <Route
            path="productos/variantes/agregar"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <VariantFormWrapper />
              </RoleRoute>
            }
          />
          <Route
            path="productos/variantes/editar/:id"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <VariantFormWrapper />
              </RoleRoute>
            }
          />
          <Route
            path="productos/variantes/lista"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <VariantListPage />
              </RoleRoute>
            }
          />
          <Route
            path="productos/variantes/:id/stock"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <StockFormWrapper />
              </RoleRoute>
            }
          />
          <Route
            path="ventas/nueva"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <SaleFormWrapper />
              </RoleRoute>
            }
          />
          <Route
            path="ventas/lista"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <SaleListPage />
              </RoleRoute>
            }
          />
          <Route
            path="ventas/detalles/:id"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <DetailsPage />
              </RoleRoute>
            }
          />
          <Route
            path="devoluciones/nueva"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <ReturnFormWrapper />
              </RoleRoute>
            }
          />
          <Route
            path="devoluciones/lista"
            element={
              <RoleRoute allowedRoles={["gerente", "cajero", "vendedor"]}>
                <ReturnListPage />
              </RoleRoute>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<h1>404 | Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
