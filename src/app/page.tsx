// src/app/page.tsx

import Link from 'next/link';

import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Image from "next/image";

export default function Home() {
  return (

    <>
    <main className="bg-gray-950 text-white font-sans">
     <Navbar></Navbar>
      {/* Hero principal */}
      <section className="relative w-full h-[85vh] text-white">
    {/* Imagen de fondo que cubre todo */}
    <Image
      src="https://ssimages2025.s3.us-east-2.amazonaws.com/BANNER.jpg"
      alt="Banner"
      fill
      className="object-cover"
    />
    {/* Overlay oscuro para contraste */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-gray-950/90" />

    {/* Contenido del hero */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Track films you’ve watched.
        <br />
        Save those you want to see.
        <br />
        Tell your friends what’s good.
      </h1>
      <a
        href="/register"
        className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold rounded"
      >
        Get started — it’s free!
      </a>
    </div>
  </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid gap-16 md:grid-cols-3 text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">Track</h2>
          <p className="text-gray-400">Keep a diary of films you watch.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Rate & Review</h2>
          <p className="text-gray-400">Share your opinions and help others find great films.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Discover</h2>
          <p className="text-gray-400">Explore lists and reviews from the community.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Join the community of film lovers.</h2>
        <p className="text-gray-400 mb-6">Letterboxd is social film discovery. Use it as diary, watchlist or film journal.</p>
        <a
          href="/register"
          className="btn btn-success text-black font-semibold"
        >
          Create your account
        </a>
      </section>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/verify">Verify</Link>
        <Link href="/films">Movie search</Link>
        <Link href="/films/details">Movie search</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/profile/edit">Profile configuration</Link>
      <Footer />
    </main>
    </>
  );
}