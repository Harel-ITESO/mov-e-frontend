/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Search } from "lucide-react";

import Footer from "../components/footer";
import Navbar from "../components/navbar";

const movies = [
  { title: "Minecraft Movie", poster: "/posters/minecraft.jpg", views: "483K", likes: "150K" },
  { title: "Sinners", poster: "/posters/sinners.jpg", views: "1.1M", likes: "385K" },
  { title: "Adolescence", poster: "/posters/adolescence.jpg", views: "681K", likes: "219K" },
  { title: "Common People", poster: "/posters/commonpeople.jpg", views: "38K", likes: "9.5K" },
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
    <main className="bg-gray-950 text-white font-sans min-h-screen">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <div className="flex items-center mb-8">
          <Search className="text-white mr-3" />
          <Input
            placeholder="Search for a film..."
            className="bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:ring-green-500"
          />
        </div>

        {/* Popular Films */}
        <h2 className="text-2xl font-bold mb-6 text-green-400">Popular Films</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {movies.map((movie, index) => (
            <Card key={index} className="bg-gray-900 text-white border border-gray-800 shadow-md">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover rounded-t"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                <div className="text-sm text-gray-400">
                  👁️ {movie.views} · ❤️ {movie.likes}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recently Reviewed */}
        <h2 className="text-2xl font-bold mb-6 text-green-400">Just Reviewed</h2>
        <div className="flex space-x-4 overflow-x-auto mb-16">
          {recentlyReviewed.map((poster, index) => (
            <img
              key={index}
              src={poster}
              alt="Recently Reviewed"
              className="w-32 h-48 object-cover rounded shadow"
            />
          ))}
        </div>

        {/* Popular Reviews */}
        <h2 className="text-2xl font-bold mb-6 text-green-400">Popular Reviews This Week</h2>
        <div className="space-y-6">
          {popularReviews.map((review, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 p-6 rounded shadow">
              <h3 className="text-xl font-semibold text-white">{review.movie}</h3>
              <p className="text-sm text-gray-400">
                Reviewed by {review.reviewer} · {review.rating}⭐
              </p>
              <p className="mt-3 text-white italic">`{review.comment}`</p>
              <p className="text-xs text-gray-500 mt-2">{review.likes}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
