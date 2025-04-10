// src/app/profile/page.tsx
"use client";


import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Link from "next/link";


export default function ProfilePage() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
    useEffect(() => {
      const stored = localStorage.getItem("user");
      const initial = stored ? JSON.parse(stored) : { name: "John Doe", email: "johndoe@email.com" };
      setUser(initial);
    }, []);
  
    return (
      <main className="bg-gray-950 text-white min-h-screen font-sans">
        <Navbar />
  
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">{user?.name}s Profile</h1>
            <Link href="/profile/edit" className="btn btn-sm btn-outline btn-accent">
              Complete / Edit Profile
            </Link>
          </div>
  
          <div className="grid md:grid-cols-3 gap-10">
            <div className="col-span-1 bg-gray-900 p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4">User Info</h2>
              <p><span className="text-gray-400">Name:</span> {user?.name}</p>
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
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Rated Barbie ★★★★☆</li>
                  <li>Added Oppenheimer to watchlist</li>
                  <li>Reviewed The Batman</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
  
        <Footer />
      </main>
    );
  }
  
