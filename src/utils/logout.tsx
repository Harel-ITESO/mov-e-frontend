import axios from "axios";

export const logout = async () => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/logout`, {
      withCredentials: true,
    });

    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("tempJwt");

    // Redirigir al login
    window.location.href = "/login";
  } catch (error) {
    console.error("Error al cerrar sesión", error);
    alert("No se pudo cerrar sesión. Intenta nuevamente.");
  }
};
