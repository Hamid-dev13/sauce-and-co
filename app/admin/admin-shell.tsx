"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./_components/sidebar";
import AuthGate from "./_components/auth-gate";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname?.endsWith("/admin/login");

  if (isLogin) {
    // Login page: no sidebar, no gate
    return <>{children}</>;
  }

  return (
    <AuthGate>
      <div className="flex min-h-screen bg-[var(--kraft)]">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </AuthGate>
  );
}
