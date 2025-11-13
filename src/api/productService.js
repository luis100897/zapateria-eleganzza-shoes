import { apiCall } from "./apiCall";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = BASE_URL + "/articulos";
const API_BASE_URL_VARIANT = BASE_URL + "/variantes";

const productsService = {
  getAllProducts: async () => {
    const url = API_BASE_URL;
    const response = await apiCall(url);
    return response.data;
  },

  getProductById: async (id) => {
    const url = `${API_BASE_URL}/${id}`;
    const response = await apiCall(url);
    return response;
  },

  createProduct: async (productData) => {
    const url = API_BASE_URL;
    const response = await apiCall(url, {
      method: "POST",
      body: productData,
      useAuth: true,
    });

    return response.data;
  },

  updateProduct: async (id, productData) => {
    const url = `${API_BASE_URL}/${id}`;
    const response = await apiCall(url, {
      method: "PUT",
      body: productData,
      useAuth: true,
    });

    return response.data;
  },

  getAllVariants: async () => {
    const url = API_BASE_URL_VARIANT;
    const response = await apiCall(url);
    return response.variantes;
  },

  getVariantById: async (id) => {
    const url = `${API_BASE_URL_VARIANT}/${id}`;
    const response = await apiCall(url);
    console.log(response);
    return response;
  },

  createVariant: async (variantData) => {
    const url = API_BASE_URL_VARIANT;
    const response = await apiCall(url, {
      method: "POST",
      body: variantData,
      useAuth: true,
    });
    return response.data;
  },
  updateVariant: async (id, variantData) => {
    const url = `${API_BASE_URL_VARIANT}/${id}`;
    const response = await apiCall(url, {
      method: "PUT",
      body: variantData,
      useAuth: true,
    });
    return response;
  },
  updateStock: async (id, stockData) => {
    const url = `${API_BASE_URL_VARIANT}/${id}/stock`;
    console.log("los datos", stockData);
    const response = await apiCall(url, {
      method: "PUT",
      body: stockData,
      useAuth: true,
    });
    return response;
  },
};
export default productsService;
