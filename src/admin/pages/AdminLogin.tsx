import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError("Credenciales inválidas");
    else navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
        <h1 className="text-4xl font-black uppercase mb-8 tracking-tighter">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border-2 border-black p-3 focus:outline-none focus:bg-yellow-50"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border-2 border-black p-3 focus:outline-none focus:bg-yellow-50"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-600 font-bold text-sm">{error}</p>}
          <button className="w-full bg-black text-white p-4 font-bold uppercase hover:bg-neutral-800 transition-colors">
            Entrar al Panel
          </button>
        </form>
      </div>
    </div>
  );
}
