"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoggedInNavbar from "../components/logged-in-navbar";

interface Movie {
    id: string;
    title: string;
    posterPath: string;
    year?: string;
    genre?: string;
  }
  

export default function MainPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Verifica si el usuario está autenticado primero
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/account/authenticated`, {
          withCredentials: true,
        });

        // Luego pide las películas populares
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/movies/popular`, {
          withCredentials: true,
        });

        setMovies(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error de autenticación o carga de películas", err);
        router.push("/login");
      }
    };

    fetchMovies();
  }, [router]);

  if (loading) {
    return (
      <main className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </main>
    );
  }

  return (
    <main className="bg-gray-950 text-white min-h-screen font-sans">
      <LoggedInNavbar />

      <section className="px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Películas Populares</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="card bg-gray-900 shadow-md hover:shadow-xl transition">
              <figure>
                            <img
                src={movie.posterPath}
                alt={movie.title}
                className="rounded-t w-full h-64 object-cover"
                />

              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base">{movie.title}</h2>
                {movie.year && <p className="text-sm text-gray-400">{movie.year}</p>}
                {movie.genre && <div className="badge badge-success mt-2">{movie.genre}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
