import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import {
  ExitToApp as LogoutIcon,
  ExpandLess,
  ExpandMore,
  Person as UserIcon,
} from "@mui/icons-material";

import { useAuth } from "../../context/AuthContext";
import { ALL_LINKS } from "./Links";

const SIDEBAR_BG_COLOR = "#233346";
const ACTIVE_COLOR = "#448aff";
const HOVER_COLOR = "rgba(255, 255, 255, 0.1)";

export const Sidebar = () => {
  const { rol, user, logout } = useAuth();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const baseRoute = rol ? `/${rol.toLowerCase()}` : "";

  const visibleLinks = ALL_LINKS.filter((link) => link.roles.includes(rol));

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const baseItemStyle = {
    borderRadius: "8px",
    mb: 0.5,
    color: "white",
    "&:hover": {
      backgroundColor: HOVER_COLOR,
    },
  };

  const getLinkStyle = (path) => {
    const fullPath = `${baseRoute}${path}`;
    const isActive =
      location.pathname.startsWith(fullPath) &&
      (fullPath !== baseRoute || location.pathname === baseRoute);

    return isActive
      ? { ...baseItemStyle, backgroundColor: ACTIVE_COLOR }
      : baseItemStyle;
  };

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: SIDEBAR_BG_COLOR,
        height: "auto",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        color: "white",
        overflowY: "auto",
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Typography variant="h6" sx={{ color: "#64b5f6", fontWeight: "bold" }}>
          Eleganzza Shoes
        </Typography>
      </Box>

      <Box sx={{ p: 2, borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <UserIcon sx={{ mr: 1, color: "gray" }} />
          <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
            {user?.nombre || "Usuario"}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "gray" }}>
          {user?.rol || "Rol"}
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1, p: 1 }}>
        {visibleLinks.map((link) => (
          <Box key={link.name}>
            {link.isDropdown ? (
              <>
                <ListItem
                  onClick={() => toggleDropdown(link.name)}
                  sx={getLinkStyle(
                    link.subLinks[0].path.split("/")[1]
                      ? `/${link.subLinks[0].path.split("/")[1]}`
                      : ""
                  )}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.name} />
                  {openDropdown === link.name ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse
                  in={openDropdown === link.name}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {link.subLinks.map((subLink) => (
                      <ListItem
                        key={subLink.name}
                        component={NavLink}
                        to={`${baseRoute}${subLink.path}`}
                        sx={{
                          pl: 4,
                          ...getLinkStyle(subLink.path),
                          "&.active": {
                            backgroundColor: ACTIVE_COLOR,
                            fontWeight: "bold",
                          },
                        }}
                      >
                        <ListItemText
                          primary={subLink.name}
                          slotProps={{
                            primary: {
                              sx: {
                                fontSize: "0.9rem",
                              },
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem
                component={NavLink}
                to={`${baseRoute}${link.path}`}
                className={({ isActive }) => (isActive ? "active" : "")}
                sx={{
                  ...baseItemStyle,
                  "&.active": {
                    backgroundColor: ACTIVE_COLOR,
                    fontWeight: "bold",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.name} />
              </ListItem>
            )}
          </Box>
        ))}
      </List>

      <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />

      <Box sx={{ p: 2, textAlign: "center" }}>
        <Button
          fullWidth
          variant="contained"
          onClick={logout}
          startIcon={<LogoutIcon />}
          sx={{
            bgcolor: "#dc3545", // Rojo
            "&:hover": { bgcolor: "#c82333" },
          }}
        >
          Salir
        </Button>
      </Box>
    </Box>
  );
};
