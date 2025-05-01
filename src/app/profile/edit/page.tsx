// src/app/profile/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    location: ""
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const data = JSON.parse(stored);
      setForm({ ...form, ...data });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    router.push("/profile");
  };

  return (
    <main className="bg-gray-950 text-white min-h-screen font-sans">
      <Navbar />

      <section className="max-w-xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Complete or Edit Your Profile</h1>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded shadow flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="input input-bordered text-black"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered text-black"
          />
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell us a bit about yourself..."
            className="textarea textarea-bordered text-black"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="input input-bordered text-black"
          />

          <button type="submit" className="btn btn-success">Save Profile</button>
        </form>
      </section>

      <Footer />
    </main>
  );
}