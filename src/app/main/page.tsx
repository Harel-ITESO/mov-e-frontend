/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import LoggedInNavbar from "../components/logged-in-navbar";

interface Movie {
  id: number;
  tmdbId: number;
  title: string;
  posterPath: string;
  year?: number;
  genre?: string;
}

export default function MainPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/account/authenticated`,
          { withCredentials: true }
        );

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/movies/popular`,
          { withCredentials: true }
        );

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
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="card bg-gray-900 shadow-md hover:shadow-xl transition cursor-pointer"
            >
              <figure>
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="rounded-t w-full h-64 object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base">{movie.title}</h2>
                {movie.year && (
                  <p className="text-sm text-gray-400">{movie.year}</p>
                )}
                {movie.genre && (
                  <div className="badge badge-success mt-2">{movie.genre}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
