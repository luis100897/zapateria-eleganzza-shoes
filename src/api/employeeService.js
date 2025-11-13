import { apiCall } from "./apiCall";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_BASE_URL = BASE_URL + "/empleados";

export const getAllEmployees = async () => {
  const url = API_BASE_URL;
  const response = await apiCall(url);
  return response.empleados;
};

export const getEmployeeById = async (id) => {
  const url = `${API_BASE_URL}/${id}`;
  const response = await apiCall(url);
  return response;
};

export const createEmployee = async (employeeData) => {
  const url = API_BASE_URL;
  const response = await apiCall(url, {
    method: "POST",
    body: employeeData,
    useAuth: true,
  });

  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const url = `${API_BASE_URL}/${id}`;
  const response = await apiCall(url, {
    method: "PUT",
    body: employeeData,
    useAuth: true,
  });
  return response.data;
};
