import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tab";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header de perfil */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-zinc-700"></div>
          <div>
            <h1 className="text-3xl font-bold">Username</h1>
            <button className="mt-2 text-sm bg-zinc-700 px-3 py-1 rounded">
              Edit Profile
            </button>
          </div>
          <div className="ml-auto flex space-x-8 text-center text-sm text-zinc-400">
            <div>
              <p className="text-lg text-white font-bold">0</p>
              <p>Films</p>
            </div>
            <div>
              <p className="text-lg text-white font-bold">0</p>
              <p>Following</p>
            </div>
            <div>
              <p className="text-lg text-white font-bold">0</p>
              <p>Followers</p>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <Tabs defaultValue="profile" className="w-full mb-8">
          <TabsList className="bg-transparent flex flex-wrap gap-4">
            <TabsTrigger value="profile" className="text-white">Profile</TabsTrigger>
            <TabsTrigger value="activity" className="text-white">Activity</TabsTrigger>
            <TabsTrigger value="films" className="text-white">Films</TabsTrigger>
            <TabsTrigger value="diary" className="text-white">Diary</TabsTrigger>
            <TabsTrigger value="reviews" className="text-white">Reviews</TabsTrigger>
            <TabsTrigger value="watchlist" className="text-white">Watchlist</TabsTrigger>
            <TabsTrigger value="likes" className="text-white">Likes</TabsTrigger>
            <TabsTrigger value="tags" className="text-white">Tags</TabsTrigger>
            <TabsTrigger value="network" className="text-white">Network</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Favorite Films */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Favorite Films</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Don’t forget to select your <span className="text-white font-bold">favorite films!</span>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Aquí mostrarías películas favoritas si las hubiera */}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Mock de recientes vistos */}
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-zinc-800 h-48" />
            ))}
          </div>
        </section>

        {/* Sidebar derecho */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Activity</h2>
          <p className="text-zinc-400 text-sm">No recent activity</p>
        </div>
      </div>
    </div>
  );
}
