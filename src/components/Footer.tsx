import { Phone, Instagram, Facebook, Mail } from "lucide-react";
import { CONTACT_INFO } from "../config/Constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Marca / Branding */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold tracking-tighter">
              La Lucentina
            </h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/50">
              Tienda Gourmet de Barrio
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
              Sabor artesanal y productos de primera en el corazón de tu barrio
              desde 2018. Calidad garantizada en cada bocado.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">
              Navegación
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Nuestra Carta", href: "#carta" },
                { label: "Dónde estamos", href: "#ubicacion" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto y Redes Sociales */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={CONTACT_INFO.phone}
                className="flex items-center gap-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Phone className="h-4 w-4" />
                </div>
                {CONTACT_INFO.phoneLabel}
              </a>
              <a
                href="mailto:hola@lalucentina.es"
                className="flex items-center gap-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Mail className="h-4 w-4" />
                </div>
                hola@lalucentina.es
              </a>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all hover:bg-white hover:text-black"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all hover:bg-white hover:text-black"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright inferior */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} La Lucentina. Todos los derechos
            reservados.
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/20">
            Diseñado con alma de barrio
          </p>
        </div>
      </div>
    </footer>
  );
}
