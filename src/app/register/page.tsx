"use client";

import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/register/email`,
        { email }
      );

      alert("Revisa tu correo para verificar tu cuenta.");
      setEmail(""); // opcional: limpiar el campo
    } catch (error: any) {
      console.error("Error al registrar el correo", error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert("Este correo ya está registrado.");
        } else {
          alert("Ocurrió un error inesperado, intenta nuevamente.");
        }
      } else {
        alert("Ocurrió un error desconocido.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-950 text-white min-h-screen font-sans">
      <Navbar />

      <section className="flex flex-col items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create your MovE account
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              className="input input-bordered w-full text-black"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn btn-success w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Create Account"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
