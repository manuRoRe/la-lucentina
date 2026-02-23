import { Phone } from "lucide-react";
import { CONTACT_INFO } from "../config/Constants";

export function FabPhone() {
  return (
    <a
      href={CONTACT_INFO.phone}
      aria-label="Llamar a La Lucentina para pedir"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 md:bottom-8 md:right-8 md:h-16 md:w-16 animate-in fade-in zoom-in duration-500"
    >
      {/* Icono de teléfono con una sombra suave interna */}
      <Phone className="h-6 w-6 md:h-7 md:w-7 drop-shadow-sm" />

      {/* Efecto de pulso sutil para llamar la atención (opcional) */}
      <span className="absolute inset-0 rounded-full bg-black animate-ping opacity-20 -z-10" />
    </a>
  );
}
