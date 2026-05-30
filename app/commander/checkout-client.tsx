"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bike, Store, Check, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useCart } from "../_lib/cart-store";
import { products } from "../_data/products";
import Sticker from "../_components/sticker";

type Step = 0 | 1 | 2 | 3;
type Mode = "delivery" | "pickup";

const stepLabels = ["Comment ?", "Tes infos", "Récap & paiement"];

export default function CheckoutClient() {
  const [step, setStep] = useState<Step>(0);
  const [mode, setMode] = useState<Mode | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const clear = useCart((s) => s.clear);

  const subtotal = total;
  const deliveryFee = mode === "delivery" ? 2.9 : 0;
  const finalTotal = subtotal + deliveryFee;

  const isInfoValid =
    form.name.trim() &&
    form.phone.trim() &&
    form.email.trim() &&
    (mode === "pickup" || form.address.trim());

  const submit = () => {
    const num = `#${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(num);
    setStep(3);
    clear();
    toast.success(`Commande ${num} envoyée`);
  };

  // Empty cart guard
  if (items.length === 0 && step < 3) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="border-brutal bg-[var(--creme)] p-12 text-center shadow-brutal">
          <p className="font-display text-5xl uppercase">Panier vide.</p>
          <p className="mt-4 font-marker text-2xl text-[var(--rouge-sauce)]">
            Difficile de commander sans rien dedans.
          </p>
          <Link
            href="/menu"
            className="mt-8 inline-flex items-center gap-2 border-brutal bg-[var(--noir)] px-6 py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Aller au menu →
          </Link>
        </div>
      </div>
    );
  }

  // Step 3 = confirmation
  if (step === 3) {
    return <ConfirmationScreen orderNumber={orderNumber!} mode={mode!} />;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Stepper */}
      <ol className="mb-12 grid grid-cols-3 gap-3">
        {stepLabels.map((label, i) => (
          <li key={label} className="flex flex-col gap-2">
            <div
              className={`h-2 border-2 border-[var(--noir)] transition-colors ${
                step >= i ? "bg-[var(--rouge-sauce)]" : "bg-[var(--creme)]"
              }`}
            />
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center border-2 border-[var(--noir)] font-display text-sm ${
                  step >= i
                    ? "bg-[var(--noir)] text-[var(--creme)]"
                    : "bg-[var(--creme)] text-[var(--noir)]"
                }`}
              >
                {step > i ? <Check size={14} /> : i + 1}
              </span>
              <span className="font-display text-sm uppercase tracking-wider text-[var(--noir)]">
                {label}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-display text-4xl uppercase text-[var(--noir)] md:text-5xl">
              Tu manges où ?
            </h2>
            <p className="mt-2 font-marker text-xl text-[var(--rouge-sauce)]">
              Livraison à domicile ou tu passes au comptoir ?
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <ModeCard
                active={mode === "delivery"}
                onClick={() => setMode("delivery")}
                icon={Bike}
                title="Livraison"
                subtitle="On t'envoie ça"
                meta="30 min · +2,90€"
              />
              <ModeCard
                active={mode === "pickup"}
                onClick={() => setMode("pickup")}
                icon={Store}
                title="Click & Collect"
                subtitle="Tu viens au comptoir"
                meta="8 min · gratuit"
              />
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={() => mode && setStep(1)}
                disabled={!mode}
                className="group flex items-center gap-2 border-brutal bg-[var(--rouge-sauce)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                Continuer
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-display text-4xl uppercase text-[var(--noir)] md:text-5xl">
              On t'appelle comment ?
            </h2>
            <p className="mt-2 font-marker text-xl text-[var(--rouge-sauce)]">
              Le minimum pour qu'on te trouve, promis.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Field
                label="Prénom & nom"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Karim B."
              />
              <Field
                label="Téléphone"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                placeholder="06 12 34 56 78"
              />
              <div className="md:col-span-2">
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="karim@exemple.fr"
                  type="email"
                />
              </div>
              {mode === "delivery" && (
                <div className="md:col-span-2">
                  <Field
                    label="Adresse de livraison"
                    value={form.address}
                    onChange={(v) => setForm({ ...form, address: v })}
                    placeholder="14 rue de Belleville, 75020 Paris"
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <Field
                  label="Notes (allergies, sonner à...)"
                  value={form.notes}
                  onChange={(v) => setForm({ ...form, notes: v })}
                  placeholder="Optionnel"
                  textarea
                />
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-2 border-brutal bg-[var(--creme)] px-6 py-3 font-display text-sm uppercase tracking-wider text-[var(--noir)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <ArrowLeft size={16} />
                Retour
              </button>
              <button
                onClick={() => isInfoValid && setStep(2)}
                disabled={!isInfoValid}
                className="group flex items-center gap-2 border-brutal bg-[var(--rouge-sauce)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                Voir le récap
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-display text-4xl uppercase text-[var(--noir)] md:text-5xl">
              On vérifie tout.
            </h2>
            <p className="mt-2 font-marker text-xl text-[var(--rouge-sauce)]">
              Dernier coup d'œil avant de cuisiner.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-5">
              {/* Items */}
              <div className="border-brutal bg-[var(--creme)] p-6 shadow-brutal md:col-span-3">
                <h3 className="font-display text-2xl uppercase">Ta commande</h3>
                <ul className="mt-4 divide-y-2 divide-[var(--noir)]/10">
                  {items.map((item) => {
                    const p = products.find((p) => p.id === item.productId);
                    if (!p) return null;
                    return (
                      <li key={item.productId} className="flex gap-3 py-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden border-2 border-[var(--noir)]">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 items-center justify-between gap-2">
                          <div>
                            <p className="font-display text-lg uppercase leading-tight">
                              {p.name}
                            </p>
                            <p className="text-xs text-[var(--noir)]/60">
                              x{item.qty}
                            </p>
                          </div>
                          <p className="font-display text-lg">
                            {(p.price * item.qty).toFixed(2)}€
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Totals */}
              <div className="md:col-span-2">
                <div className="border-brutal bg-[var(--creme)] p-6 shadow-brutal">
                  <h3 className="font-display text-2xl uppercase">Total</h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt>Sous-total</dt>
                      <dd>{subtotal.toFixed(2)}€</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>
                        {mode === "delivery" ? "Livraison" : "Click & Collect"}
                      </dt>
                      <dd>
                        {deliveryFee > 0
                          ? `${deliveryFee.toFixed(2)}€`
                          : "Gratuit"}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t-2 border-[var(--noir)] pt-3 font-display text-2xl">
                      <dt>À payer</dt>
                      <dd>{finalTotal.toFixed(2)}€</dd>
                    </div>
                  </dl>

                  <div className="mt-6">
                    <Sticker variant="yellow" rotate={-3} className="!text-xs">
                      Paiement sécurisé — démo
                    </Sticker>
                  </div>
                </div>

                <div className="mt-4 border-brutal bg-[var(--noir)] p-5 text-[var(--creme)] shadow-brutal">
                  <p className="font-display text-sm uppercase tracking-wider">
                    {mode === "delivery" ? "Livré à" : "À récupérer par"}
                  </p>
                  <p className="mt-2 text-lg">{form.name}</p>
                  {mode === "delivery" && (
                    <p className="text-sm text-[var(--creme)]/70">
                      {form.address}
                    </p>
                  )}
                  <p className="text-sm text-[var(--creme)]/70">
                    {form.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 border-brutal bg-[var(--creme)] px-6 py-3 font-display text-sm uppercase tracking-wider text-[var(--noir)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <ArrowLeft size={16} />
                Retour
              </button>
              <button
                onClick={submit}
                className="group flex items-center gap-2 border-brutal bg-[var(--rouge-sauce)] px-8 py-4 font-display text-lg uppercase tracking-wider text-[var(--creme)] shadow-brutal transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm"
              >
                Payer {finalTotal.toFixed(2)}€
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ModeCard({
  active,
  onClick,
  icon: Icon,
  title,
  subtitle,
  meta,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Bike;
  title: string;
  subtitle: string;
  meta: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col gap-3 border-brutal p-6 text-left transition-all ${
        active
          ? "bg-[var(--rouge-sauce)] text-[var(--creme)] shadow-brutal"
          : "bg-[var(--creme)] text-[var(--noir)] shadow-brutal-sm hover:shadow-brutal"
      }`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center border-2 ${
          active
            ? "border-[var(--creme)] bg-[var(--noir)] text-[var(--creme)]"
            : "border-[var(--noir)] bg-[var(--moutarde)] text-[var(--noir)]"
        }`}
      >
        <Icon size={28} />
      </div>
      <div>
        <p className="font-display text-2xl uppercase">{title}</p>
        <p className="text-sm opacity-80">{subtitle}</p>
      </div>
      <p className="font-display text-sm uppercase tracking-wider">{meta}</p>
      {active && (
        <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border-2 border-[var(--creme)] bg-[var(--creme)] text-[var(--rouge-sauce)]">
          <Check size={14} />
        </div>
      )}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const cn =
    "w-full border-brutal bg-[var(--creme)] px-4 py-3 text-base placeholder:text-[var(--noir)]/40 focus:outline-none focus:bg-[var(--moutarde)]/20";
  return (
    <div className="flex flex-col gap-2">
      <label className="font-display text-xs uppercase tracking-wider text-[var(--noir)]">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${cn} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn}
        />
      )}
    </div>
  );
}

function ConfirmationScreen({
  orderNumber,
  mode,
}: {
  orderNumber: string;
  mode: Mode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="border-brutal-thick bg-[var(--moutarde)] p-10 text-center shadow-brutal"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-brutal bg-[var(--rouge-sauce)] text-[var(--creme)] shadow-brutal-sm"
        >
          <Check size={36} strokeWidth={3} />
        </motion.div>

        <p className="font-marker text-2xl text-[var(--rouge-deep)]">
          Commande envoyée en cuisine
        </p>
        <h2 className="mt-3 font-display text-5xl uppercase leading-none text-[var(--noir)] md:text-7xl">
          Merci buddy.
        </h2>
        <p className="mt-6 font-display text-2xl uppercase tracking-wider text-[var(--noir)]/80">
          Commande {orderNumber}
        </p>
        <p className="mx-auto mt-6 max-w-md text-lg text-[var(--noir)]/85">
          {mode === "delivery"
            ? "On t'a envoyé un mail. Le livreur arrive dans une trentaine de minutes. Reste près de la sonnette."
            : "On t'a envoyé un mail. Tu peux passer la chercher dans 8 minutes au comptoir. Bonne dégustation."}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/menu"
            className="border-brutal bg-[var(--noir)] px-6 py-3 font-display text-sm uppercase tracking-wider text-[var(--creme)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Recommander quelque chose
          </Link>
          <Link
            href="/"
            className="border-brutal bg-[var(--creme)] px-6 py-3 font-display text-sm uppercase tracking-wider text-[var(--noir)] shadow-brutal-sm transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
