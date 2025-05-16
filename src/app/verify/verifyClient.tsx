"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyClient() {
  const params = useSearchParams();
  const token = params.get("token");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (token === "123456") {
      setValid(true);
    }
  }, [token]);

  return (
    <main className="flex flex-col items-center justify-center h-screen text-white bg-gray-950">
      {valid ? (
        <>
          <h1 className="text-2xl mb-4">Correo verificado con éxito ✅</h1>
          <Link href="/login" className="btn btn-success">
            Continuar
          </Link>
        </>
      ) : (
        <h1 className="text-xl text-red-500">Token inválido o expirado ❌</h1>
      )}
    </main>
  );
}
