import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/admin/dashboard");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // If user doesn't exist yet and using default credentials, sign up
      if (error.message.includes("Invalid login") && email === "bena@hills.com" && password === "Azerty2026") {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
          toast({ title: "Erreur", description: signUpError.message, variant: "destructive" });
          setLoading(false);
          return;
        }
        // Auto-confirmed, sign in again
        const { error: retryError } = await supabase.auth.signInWithPassword({ email, password });
        if (retryError) {
          toast({ title: "Erreur", description: retryError.message, variant: "destructive" });
          setLoading(false);
          return;
        }
        toast({ title: "Compte créé et connecté", description: "Bienvenue dans l'espace admin" });
        navigate("/admin/dashboard");
        setLoading(false);
        return;
      }
      toast({ title: "Erreur de connexion", description: "Identifiants incorrects", variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({ title: "Connexion réussie", description: "Bienvenue dans l'espace admin" });
    navigate("/admin/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <svg width="48" height="48" viewBox="0 0 40 40" fill="none" className="text-gold mx-auto mb-4">
            <rect x="8" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
            <rect x="14" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
            <rect x="20" y="4" width="4" height="32" rx="1" fill="currentColor" />
            <rect x="26" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
            <rect x="32" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
          </svg>
          <h1 className="text-2xl font-heading mb-2">Espace Administration</h1>
          <p className="text-foreground/60 font-body text-sm">Benak Hills — Panneau Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 border border-border p-8 bg-dark-surface">
          <div>
            <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors"
              placeholder="admin@benakhills.com"
            />
          </div>

          <div>
            <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">Mot de passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border border-border px-4 py-3 pr-12 text-foreground font-body focus:border-gold outline-none transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-gold transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-gold text-gold py-3 text-xs tracking-luxury font-body flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            {loading ? "CONNEXION..." : "SE CONNECTER"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
