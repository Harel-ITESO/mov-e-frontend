// src/app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/logged-in-navbar";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [ratings, setRatings] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const authRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/account/authenticated`, {
          credentials: "include",
        });

        if (!authRes.ok) {
          throw new Error("Not authenticated");
        }

        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/profile`, {
          credentials: "include",
        });

        const userData = await userRes.json();
        setUser({ username: userData.username, email: userData.email });
        setFavorites(userData.favoriteThreeMovies || []);
      } catch (err) {
        console.warn("Usuario no autenticado, redirigiendo...", err);
        window.location.href = "/login";
      }
    };

    const fetchRatings = async () => {
      const ratingsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/ratings`, {
        credentials: "include",
      });

      if (ratingsRes.ok) {
        const ratingsData = await ratingsRes.json();
        if (Array.isArray(ratingsData)) {
          setRatings(ratingsData.reverse());
        }
      }
    };

    checkAuthAndLoad();
    fetchRatings();
  }, []);

  const deleteRating = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/ratings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setRatings((prev) => prev.filter((r) => r.id !== id));
      } else {
        throw new Error("No se pudo eliminar el rating");
      }
    } catch (err) {
      console.error("Error al eliminar el rating", err);
      alert("No se pudo eliminar la calificación.");
    }
  };

  return (
    <main className="bg-gray-950 text-white min-h-screen font-sans">
      <Navbar />

      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">{user?.username} Profile</h1>
          <Link href="/profile/edit" className="btn btn-sm btn-outline btn-accent">
            Complete / Edit Profile
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="col-span-1 bg-gray-900 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">User Info</h2>
            <p><span className="text-gray-400">Name:</span> {user?.username}</p>
            <p><span className="text-gray-400">Email:</span> {user?.email}</p>
          </div>

          <div className="col-span-2">
            <div className="bg-gray-900 p-6 rounded shadow mb-6">
              <h2 className="text-xl font-bold mb-4">Favorite Films</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {favorites.length > 0 ? (
                favorites.map((movie, index) => (
                  <div key={index} className="relative">
                    <img
                      src={movie.posterPath}
                      alt={movie.title}
                      className="rounded aspect-[2/3] object-cover w-full shadow"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-full">No has marcado favoritas aún.</p>
              )}
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Your Ratings</h2>
              {ratings.length > 0 ? (
                <ul className="space-y-4">
                  {ratings.map((r) => (
                    <li key={`${r.toMovie.tmdbId}-${r.rating}-${r.commentary?.slice(0, 10)}`} className="bg-gray-800 p-4 rounded flex justify-between items-start">
                      <div>
                        <p className="text-lg">
                          Rated{" "}
                          <Link
                            href={`/movie/${r.toMovie.tmdbId}`}
                            className="text-green-400 hover:underline"
                          >
                            {r.toMovie.title}
                          </Link>{" "}
                          {"".padEnd(Math.floor(r.rating), "★")}
                          {r.rating % 1 === 0.5 ? "½" : ""}
                        </p>
                        {r.commentary && <p className="text-gray-300 mt-1">{r.commentary}</p>}
                        <p className="text-sm text-gray-400 mt-1">❤️ {r.likesCount} likes</p>
                      </div>
                      <button
                        //onClick={() => deleteRating(r.id)} implementar función cuando se arregle el desmadre
                        className="btn btn-sm btn-error ml-4"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No has calificado ninguna película aún.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
