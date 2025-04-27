/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const movies = [
  {
    title: "Minecraft Movie",
    poster: "/posters/minecraft.jpg",
    views: "483K",
    likes: "150K",
  },
  {
    title: "Mickey 17",
    poster: "/posters/mickey17.jpg",
    views: "1.1M",
    likes: "385K",
  },
  {
    title: "Adolescence",
    poster: "/posters/adolescence.jpg",
    views: "681K",
    likes: "219K",
  },
  {
    title: "Common People",
    poster: "/posters/commonpeople.jpg",
    views: "38K",
    likes: "9.5K",
  },
];

const recentlyReviewed = [
  "/posters/origins.jpg",
  "/posters/blackdrop.jpg",
  "/posters/nowpiercer.jpg",
  "/posters/anothermovie.jpg",
  "/posters/johnwick.jpg",
  "/posters/holidaychronicles.jpg",
  "/posters/daysrip.jpg",
];

const popularReviews = [
  {
    movie: "Minecraft Movie",
    reviewer: "Karsten",
    rating: "1.5",
    comment: "i gotta get a real job man",
    likes: "19,289 likes",
  },
];

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Barra de búsqueda */}
        <div className="flex items-center mb-6">
          <Search className="text-white mr-2" />
          <Input
            placeholder="Search for a film..."
            className="bg-zinc-800 border-none text-white placeholder:text-zinc-400"
          />
        </div>

        {/* Películas populares */}
        <h2 className="text-2xl font-semibold mb-4">Popular Films</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {movies.map((movie, index) => (
            <Card key={index} className="bg-zinc-800 text-white border-none">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover rounded-t"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                <div className="text-sm text-zinc-400">
                  👁️ {movie.views} · ❤️ {movie.likes}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Listado de recién vistos */}
        <h2 className="text-2xl font-semibold mb-4">Just Reviewed</h2>
        <div className="flex space-x-4 overflow-x-auto mb-10">
          {recentlyReviewed.map((poster, index) => (
            <img
              key={index}
              src={poster}
              alt="Recently Reviewed"
              className="w-32 h-48 object-cover rounded"
            />
          ))}
        </div>

        {/* Reviews populares */}
        <h2 className="text-2xl font-semibold mb-4">Popular Reviews This Week</h2>
        <div className="space-y-6">
          {popularReviews.map((review, index) => (
            <div key={index} className="bg-zinc-800 p-4 rounded">
              <h3 className="text-xl font-semibold">{review.movie}</h3>
              <p className="text-zinc-400 text-sm">Reviewed by {review.reviewer} · {review.rating}⭐</p>
              <p className="mt-2">`{review.comment}`</p>
              <p className="text-zinc-500 text-xs mt-1">{review.likes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}