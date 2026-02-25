import { Phone } from "lucide-react";
import ContactAlert from "./ContactAlert";

export function FabPhone() {
  return (
    <ContactAlert>
      <button
        type="button" // Siempre define el tipo en botones para evitar envíos de formulario accidentales
        aria-label="Llamar a La Lucentina para pedir"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 md:bottom-8 md:right-8 md:h-16 md:w-16 animate-in fade-in zoom-in duration-500"
      >
        {/* Icono con sombra para darle profundidad */}
        <Phone className="h-6 w-6 md:h-7 md:w-7 drop-shadow-sm" />

        {/* El efecto de pulso (Ping) */}
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-black opacity-20" />
      </button>
    </ContactAlert>
  );
}
