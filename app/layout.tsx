import type { Metadata } from "next";
import { Anton, Permanent_Marker } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import CartDrawer from "./_components/cart-drawer";
import DemoBanner from "./_components/demo-banner";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const marker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SAUCE&CO — Le burger. La sauce. Rien d'autre.",
  description:
    "8 sauces maison. 0 compromis. Smash burgers, frites fraîches, shakes maison à Paris.",
  openGraph: {
    title: "SAUCE&CO — Le burger. La sauce. Rien d'autre.",
    description: "8 sauces maison. 0 compromis. À Paris Belleville.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${anton.variable} ${marker.variable}`}>
      <body className="antialiased">
        <DemoBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              color: "#faf5ec",
              border: "2px solid #d62828",
              borderRadius: "0",
              fontFamily: "var(--font-anton)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            },
          }}
        />
      </body>
    </html>
  );
}
