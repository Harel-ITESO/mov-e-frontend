// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulamos sesión con localStorage (reemplaza con auth real más adelante)
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div className="navbar bg-gray-950 text-white px-4 border-b border-gray-800">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold text-green-400">MovE</Link>
      </div>

      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="menu menu-horizontal gap-6">
          <li><Link href="/films">Films</Link></li>
          <li><Link href="/journal">Journal</Link></li>
          <li><Link href="/lists">Lists</Link></li>
          <li><Link href="/members">Members</Link></li>
          <li><input type="text" placeholder="Search films, lists..." className="input input-sm w-64 text-black" /></li>
        </ul>
      </div>

      <div className="flex-none gap-2">
        {!isLoggedIn && (
          <>
            <Link href="/login" className="btn btn-sm btn-ghost text-white">Sign in</Link>
            <Link href="/register" className="btn btn-sm btn-success text-black">Create Account</Link>
          </>
        )}
        {isLoggedIn && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.29.534 6.121 1.47M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-900 rounded w-52">
              <li><Link href="/profile">My Profile</Link></li>
              <li><a onClick={() => { localStorage.removeItem("user"); location.reload(); }}>Log out</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
