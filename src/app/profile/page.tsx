// src/app/profile/page.tsx
"use client";


import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/logged-in-navbar";
import Link from "next/link";

export default function ProfilePage() {
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const [latestRating, setLatestRating] = useState<{
      rating: number;
      commentary: string;
      toMovie: {
        tmdbId: number;
        title: string;
      }
    } | null>(null);
  
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
          setUser({ username: userData.username, email: userData.email })

        } catch (err) {
          console.warn("Usuario no autenticado, redirigiendo...", err);
          window.location.href = "/login"; // o "/main"
        }
      };
    
      checkAuthAndLoad();

      const fetchRating = async () => {
        const ratingsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/account/ratings`, {
          credentials: "include",
        });
    
        if (ratingsRes.ok) {
          const ratingsData = await ratingsRes.json();
          if(Array.isArray(ratingsData) && ratingsData.length > 0) {
            setLatestRating(ratingsData[ratingsData.length - 1]);
          }
        }
      };

      fetchRating();

    }, []);
  
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
                  <div className="bg-gray-800 aspect-[2/3] rounded" />
                  <div className="bg-gray-800 aspect-[2/3] rounded" />
                  <div className="bg-gray-800 aspect-[2/3] rounded" />
                  <div className="bg-gray-800 aspect-[2/3] rounded" />
                </div>
              </div>
  
              <div className="bg-gray-900 p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              {latestRating ? (
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>
                    Rated{" "}
                    <Link
                      href={`/movie/${latestRating.toMovie.tmdbId}`}
                      className="text-green-400 hover:underline"
                    >
                      {latestRating.toMovie.title}
                    </Link>{" "}
                    {"".padEnd(Math.floor(latestRating.rating), "★")}
                    {latestRating.rating % 1 === 0.5 ? "½" : ""}
                  </li>
                  {latestRating.commentary && <li>Commented: `{latestRating.commentary}`</li>}
                </ul>
              ) : (
                <p className="text-gray-500">No recent activity yet.</p>
              )}
            </div>
            </div>
          </div>
        </section>
  
        <Footer />
      </main>
    );
  }
  
