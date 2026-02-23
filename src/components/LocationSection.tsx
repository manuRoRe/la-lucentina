import { MapPin, Clock, Phone } from "lucide-react";
import { CONTACT_INFO } from "../config/Constants";

const schedule = [
  { day: "Lunes", hours: "Cerrado" },
  { day: "Martes", hours: "09:00 – 14:00 / 17:00 – 21:00" },
  { day: "Miércoles", hours: "09:00 – 14:00 / 17:00 – 21:00" },
  { day: "Jueves", hours: "09:00 – 14:00 / 17:00 – 21:00" },
  { day: "Viernes", hours: "09:00 – 14:00 / 17:00 – 22:00" },
  { day: "Sábado", hours: "10:00 – 22:00" },
  { day: "Domingo", hours: "10:00 – 15:00" },
];

export function LocationSection() {
  return (
    <section id="ubicacion" className="bg-gray-50 py-20 md:py-28">
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
              src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7038%2C40.4168%2C-3.6938%2C40.4218&layer=mapnik"
              className="h-80 w-full lg:h-full lg:min-h-[450px]"
              loading="lazy"
              style={{ border: 0, filter: "grayscale(1) contrast(1.2)" }} // Toque moderno en blanco y negro
            />
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
                  Calle de la Luna, 24
                  <br />
                  28004 Madrid, España
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
                <a
                  href={CONTACT_INFO.phone}
                  className="mt-1 inline-block text-lg font-bold text-black underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  {CONTACT_INFO.phoneLabel}
                </a>
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
