"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProfileImageUploader from "../../components/ProfileImageUploader";


export default function EditProfileForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    location: "",
    website: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/profile`, {
          withCredentials: true,
        });

        const { givenName, familyName, location, website, bio } = res.data;
        setFormData({ givenName, familyName, location, website, bio });
      } catch (err) {
        console.error("No autenticado", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/update`, formData, {
        withCredentials: true,
      });
      alert("Perfil actualizado correctamente");
      router.push("/profile");
    } catch (err) {
      console.error("Error al actualizar perfil", err);
      alert("Error al actualizar perfil");
    }
  };

  if (loading) {
    return <p className="text-center text-white">Cargando datos...</p>;
  }

  return (
    <main className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
      <form className="bg-gray-900 p-8 rounded shadow w-full max-w-lg" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>

        <input
          type="text"
          placeholder="Nombre"
          className="input input-bordered w-full mb-3 text-black"
          value={formData.givenName}
          onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          className="input input-bordered w-full mb-3 text-black"
          value={formData.familyName}
          onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ubicación"
          className="input input-bordered w-full mb-3 text-black"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <input
          type="url"
          placeholder="Sitio Web"
          className="input input-bordered w-full mb-3 text-black"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
        <textarea
          placeholder="Biografía"
          className="textarea textarea-bordered w-full mb-4 text-black"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        ></textarea>
        <ProfileImageUploader />

        <button type="submit" className="btn btn-success w-full">Guardar Cambios</button>
      </form>
    </main>
  );
}
