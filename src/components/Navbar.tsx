import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/nav-links";
import ContactAlert from "./ContactAlert";
import { HashLink } from "react-router-hash-link";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <HashLink
          smooth
          to="/#inicio"
          className="flex flex-row leading-none justify-center items-center gap-3 text-foreground"
        >
          <img
            src="/images/logoLucentina.jpg"
            className="size-12 rounded-full"
            alt="Logo de la tienda"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            La Lucentina
          </span>
        </HashLink>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <HashLink
                smooth
                to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </HashLink>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <ContactAlert>
            <button
              type="button"
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:flex"
              aria-label="Llamar a La Lucentina para pedir"
            >
              <Phone className="h-4 w-4" />
              Llamar para pedir
            </button>
          </ContactAlert>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ContactAlert>
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              aria-label="Llamar a La Lucentina para pedir"
            >
              <Phone className="h-4 w-4" />
              Llamar para pedir
            </button>
          </ContactAlert>
        </div>
      )}
    </header>
  );
}
