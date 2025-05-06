"use client";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import axios from "axios";

export default function Register() {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const emailInput = document.querySelector("input[type=email]") as HTMLInputElement;
      const email = emailInput.value;

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/register/email`, {
        email,
      });

      alert("Revisa tu correo para verificar tu cuenta.");
    } catch (error) {
      console.error("Error al registrar el correo", error);
      alert("Ocurrió un error, intenta nuevamente.");
    }
  };

  return (
    <main className="bg-gray-950 text-white min-h-screen font-sans">
      <Navbar />

      <section className="flex flex-col items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Create MovE account</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
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
