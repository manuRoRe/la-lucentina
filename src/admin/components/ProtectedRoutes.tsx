import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router"; // Importa useNavigate

export function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate(); // Inicializa el hook

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      // SI EL EVENTO ES CIERRE DE SESIÓN, MANDAMOS A LA HOME
      if (event === "SIGNED_OUT") {
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-bold uppercase tracking-tighter">
        Cargando Panel...
      </div>
    );

  return session ? <Outlet /> : <Navigate to="/" replace />;
}
