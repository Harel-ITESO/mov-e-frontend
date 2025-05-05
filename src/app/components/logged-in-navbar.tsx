"use client";

import Link from "next/link";
import { logout } from "@/utils/logout";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

export default function LoggedInNavbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // Fetch suggestions with debounce
  const fetchSuggestions = debounce(async (term: string) => {
    if (!term.trim()) return setSuggestions([]);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/movies/search/${term}`, {
        withCredentials: true,
      });
      setSuggestions(res.data.slice(0, 5)); // Max 5 suggestions
    } catch (err) {
      console.error("Error buscando sugerencias:", err);
      setSuggestions([]);
    }
  }, 400);

  // Trigger search on input
  useEffect(() => {
    fetchSuggestions(searchTerm);
    return () => {
      fetchSuggestions.cancel();
    };
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      router.push(`/movie/${suggestions[0].id}`);
      setSearchTerm("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (id: number) => {
    router.push(`/movie/${id}`);
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="navbar bg-gray-900 px-6 text-white relative z-50">
      <div className="flex-1">
        <Link href="/main" className="text-xl font-bold text-success">MovE</Link>
      </div>

      <div className="flex gap-4 items-center relative">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Buscar película"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            className="input input-sm input-bordered text-black w-52"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 w-full mt-1 bg-white text-black rounded shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.map((movie) => (
                <li
                  key={movie.id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(movie.id)}
                >
                  {movie.title} ({movie.year || "Año desconocido"})
                </li>
              ))}
            </ul>
          )}
        </form>

        <Link href="/profile" className="hover:text-success">Perfil</Link>
        <button onClick={logout} className="hover:text-red-400">Logout</button>
      </div>
    </div>
  );
}
