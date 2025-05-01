/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card } from "@/app/components/ui/card";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function MovieDetails() {
  return (
    <main className="bg-gray-950 text-white font-sans min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Movie Header */}
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src="/posters/sinners.jpg"
            alt="Sinners Poster"
            className="w-full md:w-64 h-auto object-cover rounded shadow"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">Sinners</h1>
            <p className="text-gray-400 mb-2">2025 · Directed by <span className="text-green-400">Ryan Coogler</span></p>
            <p className="text-gray-300 mb-4 italic">Dance with the devil.</p>
            <p className="text-gray-200 mb-6">
              Trying to leave their troubled lives behind, twin brothers return to their hometown
              to start again, only to discover that an even greater evil is waiting to welcome them back.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>⏱ 138 mins</span>
              <span>⭐ 4.2 (12k ratings)</span>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <h2 className="text-2xl font-bold mt-12 mb-4 text-green-400">Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
          {[
            "Michael B. Jordan", "Miles Caton", "Hailee Steinfeld", "Wunmi Mosaku",
            "Jack O'Connell", "Delroy Lindo", "Jayme Lawson", "Liu Jun Li"
          ].map((actor, index) => (
            <span key={index} className="bg-gray-900 px-3 py-2 rounded shadow border border-gray-800">
              {actor}
            </span>
          ))}
        </div>

        {/* Popular Reviews */}
        <h2 className="text-2xl font-bold mt-12 mb-4 text-green-400">Popular Reviews</h2>
        <div className="space-y-6">
          {[
            {
              user: "Haiduc",
              rating: "4.5",
              text: "Finally they cast Michael A Jordan in something",
              likes: "32,695 likes",
            },
            {
              user: "Joe A",
              rating: "4.5",
              text: "That one sequence. You’ll know it when you see it. Magnum opus type scene. Spirit awakening type scene. Inspirational, foundational, monumental.",
              likes: "26,636 likes",
            },
            {
              user: "jonathan fuji",
              rating: "5",
              text: "The kind of movie that reminds you why you fell in love with movies in the first place",
              likes: "21,970 likes",
            },
          ].map((review, index) => (
            <Card key={index} className="bg-gray-900 border border-gray-800 p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-white">Review by {review.user}</h3>
              <p className="text-sm text-gray-400 mb-2">⭐ {review.rating}</p>
              <p className="text-white italic">`{review.text}`</p>
              <p className="text-xs text-gray-500 mt-2">{review.likes}</p>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
