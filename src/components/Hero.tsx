import { ArrowDown } from "lucide-react";
import ContactAlert from "./ContactAlert";
import TextType from "./ui/TextType";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Sabor artesanal de La Lucentina"
          className="h-full w-full object-cover"
        />
        {/* Overlay para asegurar que el texto blanco se lea bien sobre la imagen */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/70 md:text-sm">
          Tu tienda de confianza
        </p>
        <section className="h-50">
          <TextType
            text={[
              "PIZZERIA, PASTELERIA Y BOCADILLERIA",
              "LUNES 3x2 PIZZAS",
              "¿TIENES HAMBRE? ¡PIDE AHORA!",
            ]}
            typingSpeed={75}
            pauseDuration={2500}
            showCursor
            cursorCharacter="|"
            deletingSpeed={20}
            cursorBlinkDuration={0.5}
          />
        </section>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/80 md:text-lg">
          Pizzas en horno de piedra, pastelería fina, empanadas, bolleria
          artesanal, tartas, helados, alimentacion y mucho más.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#carta"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.5)] hover:brightness-110"
          >
            Ver la Carta
            <ArrowDown className="h-4 w-4" />
          </a>
          <ContactAlert>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/90 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              aria-label="Pedir por teléfono"
            >
              Pedir por teléfono
            </button>
          </ContactAlert>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#carta" aria-label="Ir a la sección carta">
          <ArrowDown className="h-5 w-5 text-white/50" />
        </a>
      </div>
    </section>
  );
}
