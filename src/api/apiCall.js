export const apiCall = async (
  url,
  { method = "GET", body = null, headers = {}, useAuth = true } = {}
) => {
  try {
    const token = localStorage.getItem("token");
    const finalHeaders = {
      "Content-Type": "application/json",
      ...headers,
      ...(useAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const init = { method, headers: finalHeaders };
    if (body && method.toUpperCase() !== "GET") {
      if (
        finalHeaders["Content-Type"] &&
        finalHeaders["Content-Type"].includes("application/json")
      ) {
        init.body = JSON.stringify(body);
      } else {
        init.body = body;
      }
    }

    const response = await fetch(url, init);

    if (!response.ok) {
      let errorBody = {};
      try {
        errorBody = await response.json();
      } catch (e) {
        errorBody.message = `Error HTTP ${response.status}: ${response.statusText}`;
        errorBody.title = "Error de Conexión o Servidor";
      }

      const error = new Error(
        errorBody.message ||
          errorBody.title ||
          `Ocurrió un error con el código ${response.status}.`
      );
      error.status = response.status;
      error.title = errorBody.title;

      if (error.status === 404) {
        error.message = "Recurso no encontrado.";
      }
      throw error;
    }

    const data = await response.json();

    return {
      success: true,
      ...data,
    };
  } catch (error) {
    if (error.message === "Failed to fetch") {
      throw new Error(
        "No se pudo conectar con el servidor. Verifica tu conexión."
      );
    }
    throw error;
  }
};
