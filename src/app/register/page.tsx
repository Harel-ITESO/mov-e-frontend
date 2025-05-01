// src/app/login/page.tsx
"use client";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de envío de verificación
    const token = "";
    router.push(`/verify?token=${token}`);
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
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full text-black"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full text-black"
              required
            />
            <button type="submit" className="btn btn-success w-full">Create Account</button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}