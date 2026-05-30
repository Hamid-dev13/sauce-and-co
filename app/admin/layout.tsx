import type { Metadata } from "next";
import AdminShell from "./admin-shell";

export const metadata: Metadata = {
  title: "Admin — SAUCE&CO",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
