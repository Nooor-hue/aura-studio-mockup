import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, CreditCard, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { money2 } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — AURA Studio" },
      {
        name: "description",
        content:
          "Complete your AURA Studio order: shipping details, payment method and order confirmation.",
      },
      { property: "og:title", content: "Checkout — AURA Studio" },
      { property: "og:description", content: "Complete your AURA Studio order in three steps." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const STEPS = ["Shipping", "Payment", "Confirmation"];

function Checkout() {
  const { lines, subtotal, tax, shipping, total, clear } = useCart();
  const [step, setStep] = useState(0);
  const [ship, setShip] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "Denmark",
  });
  const [pay, setPay] = useState({ card: "", exp: "", cvc: "", method: "card" });
  const [order, setOrder] = useState<{ id: string; tracking: string; total: number } | null>(null);

  if (lines.length === 0 && !order) {
    return (
      <div className="mx-auto max-w-lg px-5 py-40 text-center">
        <h1 className="text-3xl">Nothing to check out</h1>
        <p className="mt-4 text-sm text-muted-foreground">Add a piece to your bag first.</p>
        <Button className="mt-8 rounded-none" asChild>
          <Link to="/shop">Browse the catalog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-10">
      <h1 className="text-3xl md:text-5xl">Checkout</h1>

      <ol className="mt-10 flex items-center gap-3 border-b border-border pb-8">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-3">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span
              className={`eyebrow ${i <= step ? "text-foreground" : "text-muted-foreground"} hidden sm:block`}
            >
              {s}
            </span>
            {i < STEPS.length - 1 && <span className="h-px flex-1 bg-border" />}
          </li>
        ))}
      </ol>

      {step === 2 && order ? (
        <div className="mx-auto max-w-xl py-20 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Package className="h-6 w-6" />
          </span>
          <h2 className="mt-8 text-3xl md:text-4xl">Order confirmed</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Thank you, {ship.name.split(" ")[0] || "friend"}. A receipt is on its way to{" "}
            {ship.email || "your inbox"}.
          </p>
          <dl className="mt-12 divide-y divide-border border-y border-border text-left text-sm">
            {[
              ["Order number", order.id],
              ["Tracking number", order.tracking],
              ["Delivering to", `${ship.address || "—"}, ${ship.city || "—"} ${ship.zip}`],
              ["Estimated arrival", "2–4 working days"],
              ["Total paid", money2(order.total)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-4">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button className="rounded-none" asChild>
              <Link to="/account">View in my account</Link>
            </Button>
            <Button variant="outline" className="rounded-none" asChild>
              <Link to="/shop">Keep shopping</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {step === 0 && (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(1);
                  toast.success("Shipping details saved");
                }}
              >
                <h2 className="text-xl">Shipping address</h2>
                <Field
                  label="Full name"
                  value={ship.name}
                  onChange={(v) => setShip({ ...ship, name: v })}
                  placeholder="Ida Sørensen"
                />
                <Field
                  label="Email"
                  type="email"
                  value={ship.email}
                  onChange={(v) => setShip({ ...ship, email: v })}
                  placeholder="you@email.com"
                />
                <Field
                  label="Street address"
                  value={ship.address}
                  onChange={(v) => setShip({ ...ship, address: v })}
                  placeholder="Flæsketorvet 68"
                />
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field
                    label="City"
                    value={ship.city}
                    onChange={(v) => setShip({ ...ship, city: v })}
                    placeholder="Copenhagen"
                  />
                  <Field
                    label="Postal code"
                    value={ship.zip}
                    onChange={(v) => setShip({ ...ship, zip: v })}
                    placeholder="1711"
                  />
                  <Field
                    label="Country"
                    value={ship.country}
                    onChange={(v) => setShip({ ...ship, country: v })}
                    placeholder="Denmark"
                  />
                </div>
                <Button type="submit" className="h-12 w-full rounded-none">
                  Continue to payment
                </Button>
              </form>
            )}

            {step === 1 && (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  const id = `AUR-${Math.floor(4900 + Math.random() * 900)}`;
                  const tracking = `DK${Math.floor(10000000 + Math.random() * 89999999)}AU`;
                  setOrder({ id, tracking, total });
                  clear();
                  setStep(2);
                  toast.success("Payment approved", { description: `Order ${id} confirmed` });
                }}
              >
                <h2 className="text-xl">Payment method</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["card", "Card"],
                    ["invoice", "Klarna invoice"],
                  ].map(([k, label]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setPay({ ...pay, method: k as string })}
                      className={`flex items-center gap-3 border p-4 text-sm transition-colors ${
                        pay.method === k ? "border-foreground" : "border-border"
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>
                {pay.method === "card" ? (
                  <>
                    <Field
                      label="Card number"
                      value={pay.card}
                      onChange={(v) => setPay({ ...pay, card: v })}
                      placeholder="4242 4242 4242 4242"
                    />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Expiry"
                        value={pay.exp}
                        onChange={(v) => setPay({ ...pay, exp: v })}
                        placeholder="09 / 29"
                      />
                      <Field
                        label="CVC"
                        value={pay.cvc}
                        onChange={(v) => setPay({ ...pay, cvc: v })}
                        placeholder="123"
                      />
                    </div>
                  </>
                ) : (
                  <p className="border border-border p-4 text-xs leading-relaxed text-muted-foreground">
                    You'll receive an invoice by email, payable within 30 days. No card required
                    now.
                  </p>
                )}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-none"
                    onClick={() => setStep(0)}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="h-12 flex-1 rounded-none">
                    Place order · {money2(total)}
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  This is a fictional storefront. No payment is processed and no card details are
                  stored.
                </p>
              </form>
            )}
          </div>

          <aside className="border border-border p-6">
            <h2 className="eyebrow">Order summary</h2>
            <ul className="mt-6 space-y-5">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4">
                  <img
                    src={l.product.images[0]}
                    alt={l.product.name}
                    className="h-20 w-14 object-cover"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{l.product.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {l.color} · {l.size} · ×{l.qty}
                    </p>
                  </div>
                  <span className="text-sm">{money2(l.product.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-8 space-y-2 border-t border-border pt-5 text-sm">
              <Row k="Subtotal" v={money2(subtotal)} />
              <Row k="Estimated tax" v={money2(tax)} />
              <Row k="Shipping" v={shipping === 0 ? "Complimentary" : money2(shipping)} />
              <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                <dt>Total</dt>
                <dd>{money2(total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="eyebrow">{label}</Label>
      <Input
        required
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-none border-border"
      />
    </div>
  );
}
