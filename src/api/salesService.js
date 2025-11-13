import { apiCall } from "./apiCall";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = BASE_URL + "/ventas";
const API_BASE_URL_DETAILS = BASE_URL + "/detalles-venta";

const salesService = {
  getALLSales: async () => {
    const url = API_BASE_URL;
    const response = await apiCall(url);
    return response.ventas;
  },
  getSaleById: async (id) => {
    const url = `${API_BASE_URL}/${id}`;
    const response = await apiCall(url);
    return response;
  },
  createSale: async (saleData) => {
    const url = API_BASE_URL;
    const response = await apiCall(url, {
      method: "POST",
      body: saleData,
      useAuth: true,
    });
    return response;
  },
  getSaleDetailsByIdSale: async (saleId) => {
    const url = `${API_BASE_URL_DETAILS}/${saleId}`;
    const response = await apiCall(url);
    return response.detallesVenta;
  },
  getSaleDetailsByIdDetails: async (detailId) => {
    const url = `http://localhost:3001/api/v1/detalles/${detailId}`;
    const response = await apiCall(url);
    console.log("respuesta", response.data);
    return response.data;
  },
};
export default salesService;
