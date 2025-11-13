export const ALL_LINKS = [
  {
    name: "Inicio",
    path: "/dashboard",
    icon: "🏠",
    roles: ["gerente", "cajero", "vendedor"],
    isDropdown: false,
  },

  {
    name: "Empleados",
    icon: "👨‍💼",
    roles: ["gerente"],
    isDropdown: true,
    subLinks: [
      { name: "Agregar Empleado", path: "/empleados/agregar" },
      { name: "Lista de Empleados", path: "/empleados/lista" },
    ],
  },

  {
    name: "Productos",
    icon: "📦",
    roles: ["gerente", "cajero", "vendedor"],
    isDropdown: true,
    subLinks: [
      { name: "Agregar Producto", path: "/productos/agregar" },
      { name: "Lista de Productos", path: "/productos/lista" },
      {
        name: "Agregar Variante de Producto",
        path: "/productos/variantes/agregar",
      },
      { name: "Lista de Variantes", path: "/productos/variantes/lista" },
    ],
  },

  {
    name: "Ventas",
    icon: "🛒",
    roles: ["gerente", "cajero", "vendedor"],
    isDropdown: true,
    subLinks: [
      { name: "Generar Venta", path: "/ventas/nueva" },
      { name: "Consultar Ventas", path: "/ventas/lista" },
    ],
  },

  {
    name: "Devoluciones",
    icon: "🔄",
    roles: ["gerente", "cajero", "vendedor"],
    isDropdown: true,
    subLinks: [
      { name: "Generar Devolución", path: "/devoluciones/nueva" },
      { name: "Consultar Devoluciones", path: "/devoluciones/lista" },
    ],
  },
];
