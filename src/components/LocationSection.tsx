import { MapPin, Clock, Phone } from "lucide-react";
import { CONTACT_INFO } from "../config/Constants";
import ContactAlert from "./ContactAlert";

const schedule = [
  { day: "Lunes", hours: "10:00 – 15:00 / 18:00 – 00:00" },
  { day: "Martes", hours: "Cerrado" },
  { day: "Miércoles", hours: "10:00 – 15:00 / 18:00 – 00:00" },
  { day: "Jueves", hours: "10:00 – 15:00 / 18:00 – 00:00" },
  { day: "Viernes", hours: "10:00 – 15:00 / 18:00 – 00:00" },
  { day: "Sábado", hours: "10:00 – 15:00 / 18:00 – 00:00" },
  { day: "Domingo", hours: "10:00 – 15:30 / 17:30 – 00:30" },
];

export function LocationSection() {
  return (
    <section id="ubicacion" className="bg-gray-50 pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Encabezado de la sección */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Encuéntranos
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-black md:text-5xl">
            Dónde estamos
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Mapa con OpenStreetMap */}
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="Ubicación de La Lucentina"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1584.5723203165448!2d-4.481748!3d37.410056!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d70cb62882ecd%3A0x322c27a96c78a4d0!2sCalle%20Ancha%2C%2052%2C%2014900%20Lucena%2C%20C%C3%B3rdoba%2C%20Espa%C3%B1a!5e0!3m2!1ses!2sus!4v1772018051750!5m2!1ses!2sus"
              width="600"
              height="450"
              loading="lazy"
              className="h-full w-full border-0"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Información de contacto y horario */}
          <div className="flex flex-col gap-8">
            {/* Dirección */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black uppercase tracking-tight">
                  Dirección
                </h3>
                <p className="mt-1 leading-relaxed text-muted-foreground font-medium">
                  Calle Ancha, 52,
                  <br />
                  14900 Lucena, Córdoba, España
                </p>
              </div>
            </div>

            {/* Teléfono dinámico */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black uppercase tracking-tight">
                  Teléfono
                </h3>
                <ContactAlert>
                  <button
                    type="button"
                    className="mt-1 inline-block text-lg font-bold text-black underline underline-offset-4 transition-opacity hover:opacity-70"
                    aria-label="LLamar a la lucentina"
                  >
                    {CONTACT_INFO.phoneLabel}
                  </button>
                </ContactAlert>
              </div>
            </div>

            {/* Horario detallado */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-4 text-lg font-bold text-black uppercase tracking-tight">
                  Horario de apertura
                </h3>
                <ul className="flex flex-col gap-3">
                  {schedule.map((s) => (
                    <li
                      key={s.day}
                      className="flex items-center justify-between border-b border-gray-200 pb-2 last:border-0"
                    >
                      <span className="text-sm font-bold text-black">
                        {s.day}
                      </span>
                      <span
                        className={`text-sm ${
                          s.hours === "Cerrado"
                            ? "font-bold text-red-600"
                            : "text-muted-foreground font-medium"
                        }`}
                      >
                        {s.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
