import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { type Product } from "./products";

export type CartLine = {
  key: string;
  product: Product;
  size: string;
  color: string;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product, size?: string, color?: string, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<CartCtx>(() => {
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const tax = Math.round(subtotal * 0.0825 * 100) / 100;
    const shipping = subtotal === 0 || subtotal >= 250 ? 0 : 18;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
      open,
      setOpen,
      add: (product, size, color, qty = 1) => {
        const s = size ?? product.sizes[0] ?? "M";
        const c = color ?? product.colors[0]?.name ?? "Black";
        const key = `${product.id}-${s}-${c}`;
        setLines((prev) => {
          const found = prev.find((l) => l.key === key);
          if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { key, product, size: s, color: c, qty }];
        });
      },
      remove: (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
      setQty: (key, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.key !== key)
            : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
        ),
      clear: () => setLines([]),
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const ORDER_HISTORY = [
  {
    id: "AUR-4821",
    date: "12 Aug 2026",
    status: "Delivered",
    items: ["Heavyweight Boxy Hoodie", "Structured Canvas Tote"],
    total: 313,
  },
  {
    id: "AUR-4402",
    date: "29 Jun 2026",
    status: "In transit",
    items: ["Double-Faced Wool Overcoat"],
    total: 640,
  },
  {
    id: "AUR-4177",
    date: "03 May 2026",
    status: "Refunded",
    items: ["Brushed Mohair Scarf", "Minimal Leather Belt"],
    total: 214,
  },
];
