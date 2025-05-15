"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PendingEmailPage({ params }: { params: { verificationId: string } }) {
  const router = useRouter();
  const { verificationId } = params;
  const [status, setStatus] = useState<"verifying" | "error">("verifying");

  useEffect(() => {
    if (!verificationId) return;

    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/api/authentication/register/email/verification/${verificationId}`
        );

        const jwt = res.data.jwt;
        if (!jwt) throw new Error("No se recibió JWT");

        sessionStorage.setItem("tempJwt", jwt);
        router.push("/profile/edit"); // Página siguiente tras la verificación
      } catch (error) {
        console.error("Error de verificación:", error);
        setStatus("error");

        setTimeout(() => router.push("/login"), 3000);
      }
    };

    verifyEmail();
  }, [verificationId, router]);

  if (status === "verifying") {
    return (
      <main className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl">Verificando tu correo...</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
      <p className="text-red-400 text-xl text-center">
        El link no es válido o ha expirado.
        <br />
        Serás redirigido al login.
      </p>
    </main>
  );
}
