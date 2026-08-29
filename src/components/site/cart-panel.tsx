import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { money2 } from "@/lib/products";

export function CartPanel() {
  const { lines, open, setOpen, subtotal, tax, shipping, total, setQty, remove } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-foreground/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="eyebrow">Your bag ({lines.length})</span>
          <button onClick={() => setOpen(false)} aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-10 text-center">
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Button
              variant="outline"
              className="rounded-none"
              onClick={() => setOpen(false)}
              asChild
            >
              <Link to="/shop">Browse the catalog</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((l) => (
                <div key={l.key} className="flex gap-4 py-5">
                  <img
                    src={l.product.images[0]}
                    alt={l.product.name}
                    className="h-28 w-20 shrink-0 object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <span className="text-sm font-medium">{l.product.name}</span>
                      <span className="text-sm">{money2(l.product.price * l.qty)}</span>
                    </div>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {l.color} · Size {l.size}
                    </span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          className="p-1.5"
                          onClick={() => setQty(l.key, l.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs">{l.qty}</span>
                        <button
                          className="p-1.5"
                          onClick={() => setQty(l.key, l.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        onClick={() => remove(l.key)}
                        aria-label={`Remove ${l.product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{money2(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Estimated tax</dt>
                  <dd>{money2(tax)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{shipping === 0 ? "Complimentary" : money2(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                  <dt>Total</dt>
                  <dd>{money2(total)}</dd>
                </div>
              </dl>
              <Button className="mt-5 h-12 w-full rounded-none" asChild>
                <Link to="/checkout" onClick={() => setOpen(false)}>
                  Continue to checkout
                </Link>
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Free shipping on orders over $250.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
