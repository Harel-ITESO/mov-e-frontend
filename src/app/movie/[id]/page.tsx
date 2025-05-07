"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import LoggedInNavbar from "@/app/components/logged-in-navbar";
import Link from "next/link";
import { Star } from "lucide-react";

export default function MovieDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const [movieRatings, setMovieRatings] = useState<any[]>([]);
  const [commentary, setCommentary] = useState("");
  const [loading, setLoading] = useState(true);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

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

        // Trae los detalles del perfil para ver sus películas favoritas
        const profileRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/profile`,
          { withCredentials: true }
        );

        if (profileRes.data.favoriteThreeMovies?.some((fav: any) => fav.tmdbId === res.data.tmdbId)) {
          setIsFavorite(true);
        }
        //console.log("Movie data: ", res.data)
        setMovie(res.data);
      } catch (err) {
        console.error("Error al cargar detalles", err);
        router.push("/main");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();

    const fetchMovieRatings = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/ratings/movie/${id}`,
          { withCredentials: true }
        );

        setMovieRatings(res.data);
      } catch (err) {
        console.error("Error al cargar los ratings", err);
      }
    }

    fetchMovieRatings();

  }, [id, router]);

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/ratings/rating`,
        {
          tmdbId: movie.tmdbId,
          rating: rating,
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

  const renderStars = () => {
    const displayRating = hoveredRating ?? rating;
    const stars = [];
  
    for (let i = 1; i <= 5; i++) {
      let fill = "none";
      if (displayRating >= i) {
        fill = "full";
      } else if (displayRating >= i - 0.5) {
        fill = "half";
      }
  
      stars.push(
        <div
          key={i}
          className="relative cursor-pointer"
          style={{ width: "24px", height: "24px" }}
          onMouseLeave={() => setHoveredRating(null)}
        >
          {/* Mitad izquierda (media estrella) */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full z-10"
            onMouseEnter={() => setHoveredRating(i - 0.5)}
            onClick={() => setRating(i - 0.5)}
          />
          {/* Mitad derecha (estrella completa) */}
          <div
            className="absolute right-0 top-0 w-1/2 h-full z-10"
            onMouseEnter={() => setHoveredRating(i)}
            onClick={() => setRating(i)}
          />
          {/* Icono de estrella */}
          <Star
            className={`w-6 h-6 stroke-yellow-400 ${
              fill === "full"
                ? "fill-yellow-400"
                : fill === "half"
                ? "fill-yellow-400/50"
                : "fill-none"
            }`}
          />
        </div>
      );
    }
  
    return stars;
  };

  const toggleLike = async (id: number, currentlyLiked: boolean) => {
    try {
      if (currentlyLiked) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/ratings/${id}/like`,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/ratings/${id}/like`,
          {},
          { withCredentials: true }
        );
      }

      const updated = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/api/ratings/rating/${id}`,
        { withCredentials: true }
      );

      setMovieRatings((prev) => 
        prev.map((r) => 
          r.id === id ? { ...r, ...updated.data } : r
        )
      );
    } catch (err) {
      console.error("Error al dar/quitar like", err);
      alert("No se pudo procesar tu like");
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/favorite-movie?position=0`,
          { withCredentials: true }
        );
      } else {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/favorite-movie`,
          {
            favoriteMovie: {
              id: movie.tmdbId,
              posterPath: movie.posterPath,
              title: movie.title,
            },
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error al modificar favoritos", err);
      alert("No se pudo actualizar tu lista de favoritas.");
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
          <Link href="/main" className="text-green-400 hover:underline text-sm">
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
            <button
              onClick={toggleFavorite}
              className={`mt-2 px-4 py-2 rounded text-sm font-semibold transition ${
                isFavorite ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {isFavorite ? "★ Quitar de Favoritas" : "☆ Añadir a Favoritas"}
            </button>
            <p className="text-gray-300">{movie.overview}</p>
            
            {/* Lista de ratings de otros usuarios */}

            {movieRatings?.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Opiniones de otros usuarios</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {movieRatings.map((ratingItem: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-3 rounded-lg shadow flex gap-3"
                    >
                      {ratingItem.fromUser.avatarImagePath ? (
                        <img
                          src={ratingItem.fromUser.avatarImagePath}
                          alt={ratingItem.fromUser.username}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                          {ratingItem.fromUser.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{ratingItem.fromUser.username}</h3>
                          <span className="text-yellow-400 font-medium">
                            <br/>
                            {"".padEnd(Math.floor(ratingItem.rating), "★")}
                            {ratingItem.rating % 1 === 0.5 ? "½" : ""}
                          </span>
                        </div>
                          {ratingItem.commentary && (
                            <p className="text-gray-300 mt-1">{ratingItem.commentary}</p>
                          )}
                        <div className="flex items-center justify-between mt-2">
                          <button
                            onClick={() => toggleLike(ratingItem.id, ratingItem.likeFromCurrentUser)}
                            className={`flex items-center gap-1 text-sm px-2 py-1 rounded ${
                              ratingItem.likeFromCurrentUser
                                ? "bg-green-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                          >
                            ❤️ {ratingItem.likesCount}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rating form */}

        <div className="mt-10 bg-gray-800 p-6 rounded shadow-md">
          <form onSubmit={handleRatingSubmit}>
            <h2 className="text-xl font-bold mb-4">Califica esta película</h2>
            <div className="grid gap-4">
              <div className="flex gap-1">{renderStars()}</div>
              <p className="text-sm text-gray-400 mt-1">
                Calificación seleccionada: <strong>{(rating.toFixed(1))} / 5.0</strong>
              </p>
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
