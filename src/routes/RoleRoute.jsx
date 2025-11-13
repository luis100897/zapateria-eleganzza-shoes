import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const RoleRoute = ({ allowedRoles, children }) => {
  const { rol, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(rol)) {
    console.log("acceso denegado");
    if (rol) {
      const redirectPath = `/${rol.toLowerCase()}/dashboard`;
      return <Navigate to={redirectPath} replace />;
    }
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <h1>Error 403: Prohibido</h1>
        <p>No tienes permiso para acceder a este recurso.</p>
      </div>
    );
  }
  return children;
};
