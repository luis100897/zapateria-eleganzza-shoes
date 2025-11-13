import { apiCall } from "./apiCall";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = BASE_URL + "/devoluciones";

const returnService = {
  getAllReturns: async () => {
    const url = API_BASE_URL;
    const response = await apiCall(url);
    return response.devoluciones;
  },
  createReturn: async (returnData) => {
    const url = API_BASE_URL;
    const response = await apiCall(url, {
      method: "POST",
      body: returnData,
      useAuth: true,
    });
    return response;
  },
};
export default returnService;
