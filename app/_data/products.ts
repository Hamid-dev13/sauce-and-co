import type { Product } from "../_lib/types";

export const products: Product[] = [
  {
    id: "classic",
    name: "The Classic",
    description:
      "Bœuf 180g, cheddar fondu, salade, tomate, oignon rouge, cornichons. Sauce house au choix.",
    price: 9.5,
    category: "burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
    tags: ["best"],
    sauces: ["house", "burger-classique", "honey-mustard"],
    allergens: ["gluten", "lactose"],
  },
  {
    id: "double-trouble",
    name: "Double Trouble",
    description:
      "Deux steaks smash 100g, double cheddar, bacon croustillant, oignon caramélisé.",
    price: 12.9,
    category: "burgers",
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=1200&q=80",
    tags: ["best"],
    sauces: ["house", "bbq-noir", "cheddar-fondu"],
    allergens: ["gluten", "lactose"],
  },
  {
    id: "smash",
    name: "Smash Original",
    description:
      "Steak smashé 150g, fromage américain, oignons grillés, cornichons. À l'ancienne.",
    price: 8.9,
    category: "burgers",
    image:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1200&q=80",
    tags: [],
    sauces: ["house", "burger-classique", "spicy-mayo"],
    allergens: ["gluten", "lactose"],
  },
  {
    id: "cheese-lover",
    name: "Cheese Lover",
    description:
      "Bœuf 180g, triple fromage (cheddar, raclette, bleu), oignons confits, sauce cheddar fondu.",
    price: 11.5,
    category: "burgers",
    image:
      "https://images.unsplash.com/photo-1550317138-10000687a72b?w=1200&q=80",
    tags: ["new"],
    sauces: ["cheddar-fondu", "house"],
    allergens: ["gluten", "lactose"],
  },
  {
    id: "bbq-beast",
    name: "BBQ Beast",
    description:
      "Bœuf 220g, bacon, oignons frits, cheddar, sauce BBQ noir. Pour les gros appétits.",
    price: 13.5,
    category: "burgers",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1200&q=80",
    tags: ["best"],
    sauces: ["bbq-noir", "house"],
    allergens: ["gluten", "lactose"],
  },
  {
    id: "spicy-one",
    name: "The Spicy One",
    description:
      "Bœuf 180g, jalapeños frais, pepper jack, oignon rouge, sauce buffalo. Ça pique.",
    price: 10.9,
    category: "burgers",
    image:
      "https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=1200&q=80",
    tags: ["spicy"],
    sauces: ["buffalo", "spicy-mayo"],
    allergens: ["gluten", "lactose"],
  },
  {
    id: "veggie",
    name: "Green Smash",
    description:
      "Galette pois chiches & haricots noirs, avocat, oignon rouge, salade, sauce honey mustard.",
    price: 9.9,
    category: "burgers",
    image:
      "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=1200&q=80",
    tags: ["veggie", "new"],
    sauces: ["honey-mustard", "black-garlic"],
    allergens: ["gluten"],
  },
  // SIDES
  {
    id: "fries",
    name: "Frites fraîches",
    description: "Coupées le matin, plongées deux fois. Sel de Guérande.",
    price: 3.9,
    category: "sides",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200&q=80",
    tags: ["best"],
  },
  {
    id: "fries-cajun",
    name: "Frites Cajun",
    description: "Nos frites fraîches assaisonnées au mélange cajun maison.",
    price: 4.5,
    category: "sides",
    image:
      "https://images.unsplash.com/photo-1639024471283-03518883512d?w=1200&q=80",
    tags: ["spicy"],
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    description: "Oignons doux, panure croustillante, sauce house pour tremper.",
    price: 4.9,
    category: "sides",
    image:
      "https://images.unsplash.com/photo-1639024471283-03518883512d?w=1200&q=80",
    tags: [],
  },
  {
    id: "mozza-sticks",
    name: "Mozza Sticks",
    description: "6 bâtonnets de mozzarella panés, servis avec sauce BBQ noir.",
    price: 5.5,
    category: "sides",
    image:
      "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=1200&q=80",
    tags: [],
    allergens: ["gluten", "lactose"],
  },
  // SHAKES
  {
    id: "shake-vanilla",
    name: "Shake Vanille",
    description: "Glace vanille Madagascar, crème fraîche, brisures de cookie.",
    price: 5.5,
    category: "shakes",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1200&q=80",
    tags: ["best"],
    allergens: ["lactose"],
  },
  {
    id: "shake-choco",
    name: "Shake Chocolat",
    description: "Chocolat noir 70%, glace vanille, copeaux de chocolat amer.",
    price: 5.9,
    category: "shakes",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
    tags: [],
    allergens: ["lactose"],
  },
  {
    id: "shake-oreo",
    name: "Shake Oreo",
    description: "Glace vanille, biscuits Oreo écrasés, chantilly maison.",
    price: 6.5,
    category: "shakes",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1200&q=80",
    tags: ["new"],
    allergens: ["lactose", "gluten"],
  },
  {
    id: "shake-caramel",
    name: "Caramel Beurre Salé",
    description: "Glace vanille, caramel de Bretagne, fleur de sel.",
    price: 6.5,
    category: "shakes",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1200&q=80",
    tags: ["limited"],
    allergens: ["lactose"],
  },
  // BOISSONS
  {
    id: "soda-cola",
    name: "Cola Verre",
    description: "Coca-Cola en bouteille verre 33cl, bien frais.",
    price: 3.5,
    category: "boissons",
    image:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=1200&q=80",
    tags: [],
  },
  {
    id: "limonade-maison",
    name: "Limonade Maison",
    description: "Citron pressé, gingembre frais, basilic. 40cl.",
    price: 4.5,
    category: "boissons",
    image:
      "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=1200&q=80",
    tags: ["new"],
  },
  // EXTRAS
  {
    id: "extra-bacon",
    name: "Extra Bacon",
    description: "Deux tranches de bacon fumé pour pimper ton burger.",
    price: 1.9,
    category: "extras",
    image:
      "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=1200&q=80",
    tags: [],
  },
  {
    id: "extra-cheddar",
    name: "Extra Cheddar",
    description: "Une tranche supplémentaire de cheddar fondu.",
    price: 1.2,
    category: "extras",
    image:
      "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=1200&q=80",
    tags: [],
    allergens: ["lactose"],
  },
];
