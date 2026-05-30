"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../../_lib/auth-store";
import Sticker from "../../_components/sticker";

export default function LoginClient() {
  const router = useRouter();
  const login = useAuth((s) => s.login);
  const isLoggedIn = useAuth((s) => s.isLoggedIn);
  const hasHydrated = useAuth((s) => s.hasHydrated);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (hasHydrated && isLoggedIn) {
      router.push("/admin");
    }
  }, [hasHydrated, isLoggedIn, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const ok = login(user, pass);
    if (ok) {
      router.push("/admin");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[var(--kraft)] px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="absolute -left-4 -top-8 hidden md:block">
          <Sticker variant="red" rotate={-8}>
            Back-office
          </Sticker>
        </div>

        <form
          onSubmit={submit}
          className="border-brutal-thick bg-[var(--creme)] p-8 shadow-brutal"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center border-brutal bg-[var(--noir)] text-[var(--creme)] shadow-brutal-sm">
              <Lock size={22} />
            </div>
            <div>
              <p className="font-marker text-base text-[var(--rouge-sauce)]">
                Espace équipe
              </p>
              <h1 className="font-display text-3xl uppercase text-[var(--noir)]">
                Connexion
              </h1>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label className="font-display text-xs uppercase tracking-wider">
              Identifiant
            </label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="admin"
              autoFocus
              className="border-brutal bg-[var(--creme)] px-4 py-3 focus:bg-[var(--moutarde)]/20 focus:outline-none"
            />
          </div>

          <div className="mb-6 flex flex-col gap-2">
            <label className="font-display text-xs uppercase tracking-wider">
              Mot de passe
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••"
              className="border-brutal bg-[var(--creme)] px-4 py-3 focus:bg-[var(--moutarde)]/20 focus:outline-none"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: [0, -6, 6, -3, 3, 0] }}
              className="mb-4 font-marker text-lg text-[var(--rouge-sauce)]"
            >
              Mauvais combo. Essaie encore.
            </motion.p>
          )}

          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 border-brutal bg-[var(--rouge-sauce)] py-4 font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm"
          >
            Entrer
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <div className="mt-6 border-t-2 border-[var(--noir)]/10 pt-4">
            <p className="font-marker text-sm text-[var(--noir)]/60">
              Démo — utilise{" "}
              <code className="border-2 border-[var(--noir)]/20 bg-[var(--moutarde)]/30 px-2 py-0.5 font-mono text-xs">
                admin
              </code>{" "}
              /{" "}
              <code className="border-2 border-[var(--noir)]/20 bg-[var(--moutarde)]/30 px-2 py-0.5 font-mono text-xs">
                admin
              </code>
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
