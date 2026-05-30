import type { Category } from "../_lib/types";

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "burgers", label: "Burgers", emoji: "🍔" },
  { id: "sides", label: "À côté", emoji: "🍟" },
  { id: "shakes", label: "Shakes", emoji: "🥤" },
  { id: "boissons", label: "Boissons", emoji: "🥃" },
  { id: "extras", label: "Extras", emoji: "🧀" },
];
