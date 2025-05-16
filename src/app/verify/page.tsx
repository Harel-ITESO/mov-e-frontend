import { Suspense } from "react";
import VerifyClient from "./verifyClient";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-white">Cargando verificación...</div>}>
      <VerifyClient />
    </Suspense>
  );
}
