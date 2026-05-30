import Link from "next/link";
import KpiCard from "./_components/kpi-card";
import RevenueChart from "./_components/revenue-chart";
import StatusBadge from "./_components/status-badge";
import { ordersMock, dashboardStats } from "../_data/orders-mock";

export default function AdminDashboard() {
  const recentOrders = ordersMock.slice(0, 6);

  return (
    <section className="p-6 md:p-10">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="font-marker text-lg text-[var(--rouge-sauce)]">
            Hey chef
          </p>
          <h1 className="font-display text-4xl uppercase text-[var(--noir)] md:text-5xl">
            Aujourd'hui
          </h1>
        </div>
        <div className="hidden border-2 border-[var(--noir)] bg-[var(--creme)] px-4 py-2 font-display text-sm uppercase tracking-wider text-[var(--noir)] md:block">
          {new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </div>
      </header>

      {/* KPIs */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="CA aujourd'hui"
          value={`${dashboardStats.revenueToday}€`}
          delta={12}
          sub="vs hier"
          accent="red"
        />
        <KpiCard
          label="Commandes"
          value={String(dashboardStats.ordersToday)}
          delta={8}
          sub="depuis 11h30"
          accent="moutarde"
        />
        <KpiCard
          label="Ticket moyen"
          value={`${dashboardStats.avgTicket}€`}
          delta={4}
          sub="vs 7 derniers j."
          accent="noir"
        />
        <KpiCard
          label="Top sauce"
          value={dashboardStats.topSauce}
          sub="142 commandes / 7j"
          accent="vert"
        />
      </div>

      {/* Chart + top products */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="border-brutal bg-[var(--creme)] p-6 shadow-brutal">
          <p className="font-marker text-base text-[var(--rouge-sauce)]">
            Cette semaine
          </p>
          <h3 className="font-display text-2xl uppercase">Top produits</h3>
          <ol className="mt-6 space-y-3">
            {dashboardStats.topProducts.map((p, i) => (
              <li
                key={p.name}
                className="flex items-center gap-3 border-2 border-[var(--noir)] bg-[var(--creme)] px-3 py-2"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[var(--noir)] bg-[var(--moutarde)] font-display text-sm">
                  {i + 1}
                </span>
                <span className="flex-1 font-display text-sm uppercase">
                  {p.name}
                </span>
                <span className="font-display text-base text-[var(--rouge-sauce)]">
                  {p.count}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Recent orders */}
      <div className="border-brutal bg-[var(--creme)] shadow-brutal">
        <header className="flex items-center justify-between border-b-2 border-[var(--noir)] bg-[var(--noir)] px-6 py-4 text-[var(--creme)]">
          <div>
            <p className="font-marker text-sm text-[var(--moutarde)]">
              En live
            </p>
            <h3 className="font-display text-xl uppercase">
              Dernières commandes
            </h3>
          </div>
          <Link
            href="/admin/orders"
            className="border-2 border-[var(--creme)] px-3 py-1 font-display text-xs uppercase tracking-wider hover:bg-[var(--rouge-sauce)]"
          >
            Toutes →
          </Link>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-[var(--noir)] bg-[var(--kraft-light)]/40 text-left">
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">
                  N°
                </th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">
                  Client
                </th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">
                  Articles
                </th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">
                  Mode
                </th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-[var(--noir)]/10 transition-colors hover:bg-[var(--kraft-light)]/30"
                >
                  <td className="px-4 py-3 font-display text-base">
                    {o.number}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {o.customerName}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--noir)]/70">
                    {o.items.reduce((a, b) => a + b.qty, 0)} articles
                  </td>
                  <td className="px-4 py-3 text-sm uppercase tracking-wider">
                    {o.mode === "delivery" ? "Livraison" : "Click & C."}
                  </td>
                  <td className="px-4 py-3 font-display">
                    {o.total.toFixed(2)}€
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
