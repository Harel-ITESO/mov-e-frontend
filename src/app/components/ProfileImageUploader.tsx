/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import axios from "axios";

export default function ProfileImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("profile-picture", file);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/profile-picture/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Foto actualizada con éxito");
      window.location.reload(); 
    } catch (err) {
      console.error("Error al subir la imagen", err);
      alert("Hubo un problema al subir la foto.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Foto de perfil</h2>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
        />
      )}

      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        className="file-input file-input-bordered w-full max-w-xs mb-4"
      />

      <button
        className="btn btn-success w-full"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Subiendo..." : "Subir imagen"}
      </button>
    </div>
  );
}
