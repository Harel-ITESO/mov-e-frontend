// src/app/login/page.tsx
"use client";
import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Login() {
  return (
    <main className="bg-gray-950 text-white min-h-screen font-sans">
      <Navbar />

      <section className="flex flex-col items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign in to MovE</h1>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email address"
              className="input input-bordered w-full text-black"
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full text-black"
            />
            <button className="btn btn-success w-full">Sign in</button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-4">
            Don’t have an account?{' '}
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
