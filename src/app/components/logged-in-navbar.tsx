"use client";

import Link from "next/link";
import { logout } from "@/utils/logout";

export default function LoggedInNavbar() {
    return (
      <div className="navbar bg-gray-900 px-6 text-white">
        <div className="flex-1">
          <Link href="/main" className="text-xl font-bold text-success">MovE</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/profile/edit" className="hover:text-success">Perfil</Link>
          <button onClick={logout} className="hover:text-red-400">
            Logout
          </button>
        </div>
      </div>
    );
  }