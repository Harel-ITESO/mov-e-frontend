"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatedPassword: "",
  });

  useEffect(() => {
    const validateSession = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/account/authenticated`,
          { withCredentials: true }
        );
      } catch (err) {
       
      }
    };
  
    validateSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const jwt = sessionStorage.getItem("tempJwt");
    if (!jwt) {
      alert("Token no disponible. Verifica tu correo nuevamente.");
      return;
    }
  
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/register/signup`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
  
      sessionStorage.removeItem("tempJwt");
      alert("Cuenta creada con éxito");
      router.push("/login");
    } catch (error: any) {
      console.error("Error en el registro:", error?.response?.data || error);
      alert(error?.response?.data?.message || "Error al completar el registro.");
    }
  };

  return (
    <main className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
            type="text"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Repetir contraseña"
            value={formData.repeatedPassword}
            onChange={(e) => setFormData({ ...formData, repeatedPassword: e.target.value })}
            required
          />
        <button type="submit" className="btn btn-success">Completar Registro</button>
      </form>
    </main>
  );
}
