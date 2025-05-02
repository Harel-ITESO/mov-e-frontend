"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const loginData = {
        emailOrUsername: formData.email,
        password: formData.password,
      };
  
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/login`,
        loginData,
        {
          withCredentials: true, 
        }
      );
  
      router.push("/main");
    } catch (err: any) {
      console.error("Login failed:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Credenciales incorrectas.");
    }
  };
  

  return (
    <main className="bg-gray-950 text-white min-h-screen font-sans">
      <Navbar />

      <section className="flex flex-col items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign in to MovE</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              className="input input-bordered w-full text-black"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full text-black"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button type="submit" className="btn btn-success w-full">Sign in</button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-4">
            Don’t have an account?{" "}
            <Link href="/register" className="text-green-400 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
