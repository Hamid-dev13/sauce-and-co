import type { Order } from "../_lib/types";

export const ordersMock: Order[] = [
  {
    id: "o1",
    number: "#1042",
    customerName: "Karim B.",
    items: [
      { name: "Double Trouble", qty: 1, price: 12.9 },
      { name: "Frites Cajun", qty: 1, price: 4.5 },
      { name: "Shake Oreo", qty: 1, price: 6.5 },
    ],
    total: 23.9,
    status: "preparing",
    createdAt: "2026-05-30T12:42:00",
    mode: "pickup",
  },
  {
    id: "o2",
    number: "#1041",
    customerName: "Léa M.",
    items: [
      { name: "Spicy One", qty: 1, price: 10.9 },
      { name: "Frites fraîches", qty: 1, price: 3.9 },
    ],
    total: 14.8,
    status: "ready",
    createdAt: "2026-05-30T12:35:00",
    mode: "delivery",
  },
  {
    id: "o3",
    number: "#1040",
    customerName: "Théo R.",
    items: [
      { name: "BBQ Beast", qty: 2, price: 13.5 },
      { name: "Onion Rings", qty: 1, price: 4.9 },
      { name: "Cola Verre", qty: 2, price: 3.5 },
    ],
    total: 38.9,
    status: "delivered",
    createdAt: "2026-05-30T12:20:00",
    mode: "delivery",
  },
  {
    id: "o4",
    number: "#1039",
    customerName: "Yasmine D.",
    items: [
      { name: "Green Smash", qty: 1, price: 9.9 },
      { name: "Limonade Maison", qty: 1, price: 4.5 },
    ],
    total: 14.4,
    status: "new",
    createdAt: "2026-05-30T12:48:00",
    mode: "pickup",
  },
  {
    id: "o5",
    number: "#1038",
    customerName: "Marc P.",
    items: [
      { name: "The Classic", qty: 1, price: 9.5 },
      { name: "Frites fraîches", qty: 1, price: 3.9 },
      { name: "Shake Caramel", qty: 1, price: 6.5 },
    ],
    total: 19.9,
    status: "delivered",
    createdAt: "2026-05-30T12:05:00",
    mode: "pickup",
  },
  {
    id: "o6",
    number: "#1037",
    customerName: "Sofia A.",
    items: [
      { name: "Cheese Lover", qty: 1, price: 11.5 },
      { name: "Mozza Sticks", qty: 1, price: 5.5 },
    ],
    total: 17.0,
    status: "delivered",
    createdAt: "2026-05-30T11:50:00",
    mode: "delivery",
  },
  {
    id: "o7",
    number: "#1036",
    customerName: "Nathan L.",
    items: [
      { name: "Double Trouble", qty: 1, price: 12.9 },
      { name: "Extra Bacon", qty: 1, price: 1.9 },
      { name: "Cola Verre", qty: 1, price: 3.5 },
    ],
    total: 18.3,
    status: "delivered",
    createdAt: "2026-05-30T11:42:00",
    mode: "pickup",
  },
  {
    id: "o8",
    number: "#1035",
    customerName: "Inès V.",
    items: [
      { name: "Smash Original", qty: 1, price: 8.9 },
      { name: "Frites fraîches", qty: 1, price: 3.9 },
    ],
    total: 12.8,
    status: "cancelled",
    createdAt: "2026-05-30T11:30:00",
    mode: "delivery",
  },
];

export const dashboardStats = {
  revenueToday: 1247,
  ordersToday: 64,
  avgTicket: 19.5,
  topSauce: "House",
  // Last 30 days revenue (€)
  revenue30d: [
    920, 1140, 1080, 1340, 1450, 1620, 1810, 1240, 1190, 1410, 1530, 1580,
    1720, 1840, 1480, 1310, 1290, 1490, 1560, 1640, 1780, 1920, 1530, 1410,
    1380, 1490, 1540, 1620, 1180, 1247,
  ],
  topProducts: [
    { name: "Double Trouble", count: 142 },
    { name: "The Classic", count: 118 },
    { name: "BBQ Beast", count: 96 },
    { name: "Frites fraîches", count: 82 },
    { name: "Shake Oreo", count: 71 },
  ],
};
