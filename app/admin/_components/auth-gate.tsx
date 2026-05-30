"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../_lib/auth-store";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hasHydrated = useAuth((s) => s.hasHydrated);
  const isLoggedIn = useAuth((s) => s.isLoggedIn);

  useEffect(() => {
    if (hasHydrated && !isLoggedIn) {
      router.push("/admin/login");
    }
  }, [hasHydrated, isLoggedIn, router]);

  if (!hasHydrated || !isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--kraft)]">
        <p className="font-marker text-2xl text-[var(--noir)]/60">
          On vérifie le badge…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
