export type Category =
  | "burgers"
  | "sides"
  | "shakes"
  | "boissons"
  | "extras";

export type Tag = "best" | "new" | "spicy" | "veggie" | "limited";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  tags: Tag[];
  sauces?: string[];
  allergens?: ("gluten" | "lactose" | "oeuf" | "sesame")[];
};

export type SpiceLevel = 0 | 1 | 2 | 3;

export type Sauce = {
  id: string;
  name: string;
  tagline: string;
  story: string;
  color: string;
  spice: SpiceLevel;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
};

export type CartItem = {
  productId: string;
  qty: number;
  sauceId?: string;
};

export type OrderStatus = "new" | "preparing" | "ready" | "delivered" | "cancelled";

export type Order = {
  id: string;
  number: string;
  customerName: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  mode: "delivery" | "pickup";
};
