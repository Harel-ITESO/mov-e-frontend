"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import LoggedInNavbar from "@/app/components/logged-in-navbar";
import Link from "next/link";

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [commentary, setCommentary] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        // Verifica si el usuario está autenticado
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/account/authenticated`, {
          withCredentials: true,
        });

        // Trae los detalles de la película
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/movies/movie/${id}/detail`,
          { withCredentials: true }
        );
        setMovie(res.data);
      } catch (err) {
        console.error("Error al cargar detalles", err);
        router.push("/main");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, router]);

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/ratings/rating`,
        {
          movieId: movie.id,
          rating,
          commentary,
        },
        { withCredentials: true }
      );
      alert("¡Calificación enviada!");
    } catch (err) {
      console.error("Error al calificar", err);
      alert("No se pudo enviar la calificación.");
    }
  };

  if (loading || !movie) {
    return (
      <main className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </main>
    );
  }

  return (
    <main className="bg-gray-950 text-white min-h-screen font-sans">
      <LoggedInNavbar />

      <div className="max-w-5xl mx-auto py-10 px-6">
        {/* Botón de regreso */}
        <div className="mb-4">
          <Link
            href="/main"
            className="text-green-400 hover:underline text-sm"
          >
            ← Volver a películas populares
          </Link>
        </div>

        {/* Detalle de película */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={movie.posterPath}
              alt={movie.title}
              className="rounded shadow w-full h-auto"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-2">
              {movie.title} <span className="text-gray-400">({movie.year})</span>
            </h1>
            <p className="text-gray-300">{movie.overview}</p>
          </div>
        </div>

        {/* Rating form */}
        <div className="mt-10 bg-gray-800 p-6 rounded shadow-md">
          <form onSubmit={handleRatingSubmit}>
            <h2 className="text-xl font-bold mb-4">Califica esta película</h2>
            <div className="grid gap-4">
              <input
                type="number"
                min="0"
                max="10"
                step="0.5"
                className="input input-bordered w-full text-black"
                placeholder="Rating de 0 a 10"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              />
              <textarea
                className="textarea textarea-bordered w-full text-black"
                placeholder="Comentario (opcional)"
                value={commentary}
                onChange={(e) => setCommentary(e.target.value)}
              />
              <button className="btn btn-success w-full" type="submit">
                Enviar Calificación
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
