import { apiCall } from "./apiCall";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (credentials) => {
  const url = `${BASE_URL}/login`;

  const response = await apiCall(url, {
    method: "POST",
    body: credentials,
    useAuth: false,
  });

  if (response.token && response.user) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  } else {
    throw new Error("Respuesta del servidor incompleta.");
  }

  return response;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
