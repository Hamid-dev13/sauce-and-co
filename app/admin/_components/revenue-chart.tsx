"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { dashboardStats } from "../../_data/orders-mock";

const data = dashboardStats.revenue30d.map((v, i) => ({
  day: `J-${30 - i}`,
  ca: v,
}));

export default function RevenueChart() {
  return (
    <div className="border-brutal bg-[var(--creme)] p-6 shadow-brutal">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <p className="font-marker text-base text-[var(--rouge-sauce)]">
            30 derniers jours
          </p>
          <h3 className="font-display text-2xl uppercase">Chiffre d'affaires</h3>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl uppercase">
            {dashboardStats.revenue30d
              .reduce((a, b) => a + b, 0)
              .toLocaleString("fr-FR")}
            €
          </p>
          <p className="text-xs uppercase tracking-wider text-[var(--noir)]/60">
            Cumul
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="caFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d62828" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#d62828" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#0a0a0a15" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#0a0a0a"
              tick={{ fontSize: 10, fontFamily: "var(--font-anton)" }}
              interval={4}
              tickLine={false}
            />
            <YAxis
              stroke="#0a0a0a"
              tick={{ fontSize: 10, fontFamily: "var(--font-anton)" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#0a0a0a",
                color: "#faf5ec",
                border: "2px solid #d62828",
                borderRadius: 0,
                fontFamily: "var(--font-anton)",
                fontSize: 12,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
              labelStyle={{ color: "#f2b134" }}
              formatter={(v) => [`${v}€`, "CA"] as [string, string]}
            />
            <Area
              type="monotone"
              dataKey="ca"
              stroke="#d62828"
              strokeWidth={3}
              fill="url(#caFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
