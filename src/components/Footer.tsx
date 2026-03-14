import { Phone, Instagram, Facebook } from "lucide-react";
import { CONTACT_INFO } from "../config/Constants";
import { navLinks } from "@/lib/nav-links";
import ContactAlert from "./ContactAlert";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold tracking-tighter">
              La Lucentina
            </h3>
            <p className="mt-1 text-[12px] uppercase tracking-[0.3em] text-white/50">
              Tu Tienda de Confianza
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
              Pizzas en horno de piedra, pastelería fina, empanadas, bolleria
              artesanal, tartas, helados, alimentacion y mucho más.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-white/40">
              Navegación
            </h4>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
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
              <ContactAlert>
                <button
                  type="button"
                  className="flex items-center gap-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"
                  aria-label="Llamar a la lucentina"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                    <Phone className="h-4 w-4" />
                  </div>
                  {CONTACT_INFO.phoneLabel}
                </button>
              </ContactAlert>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.instagram.com/lalucentina_?igsh=M2sydW81eWZydnlt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all hover:bg-white hover:text-black"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/lalucentina?rdid=mi7qdEnl1heeKdEc&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Cry1mTSpQ%2F#"
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
          <p className="text-[12px] uppercase tracking-widest text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} La Lucentina.
          </p>
          <p className="text-[12px] uppercase tracking-widest text-white/20">
            <Link to="admin-login">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
