import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/account", label: "Account" },
];

export function Navbar() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-5 md:px-10">
        <button
          className="-ml-1 p-1 md:hidden"
          onClick={() => setMenu(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="font-display text-lg tracking-[-0.06em]">
          AURA<span className="text-muted-foreground"> STUDIO</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="eyebrow text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "eyebrow text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link to="/account" className="hidden p-2 md:block" aria-label="My account">
            <User className="h-[18px] w-[18px]" />
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="relative p-2"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menu && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setMenu(false)} />
          <aside className="absolute inset-y-0 left-0 w-[82%] max-w-xs bg-background p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-base tracking-[-0.06em]">AURA STUDIO</span>
              <button onClick={() => setMenu(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col">
              <Link
                to="/"
                onClick={() => setMenu(false)}
                className="border-b border-border py-4 font-display text-2xl tracking-tight"
              >
                Home
              </Link>
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMenu(false)}
                  className="border-b border-border py-4 font-display text-2xl tracking-tight"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
              Circular design, ethical textiles, made in limited runs.
            </p>
          </aside>
        </div>
      )}
    </header>
  );
}
