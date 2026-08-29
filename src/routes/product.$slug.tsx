import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Minus, Plus, Truck, RefreshCcw, Leaf } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/site/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { PRODUCTS, getProduct, money } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — AURA Studio" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — AURA Studio` },
        { name: "description", content: p.blurb },
        { property: "og:title", content: `${p.name} — AURA Studio` },
        { property: "og:description", content: p.blurb },
        { property: "og:image", content: p.images[0] ?? "" },
        { name: "twitter:image", content: p.images[0] ?? "" },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: ProductMissing,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "M");
  const [color, setColor] = useState(product.colors[0]?.name ?? "Black");
  const [qty, setQty] = useState(1);
  const [hero, setHero] = useState(0);

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-10">
      <nav className="eyebrow text-muted-foreground">
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex gap-4 md:flex-col">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setHero(i)}
                className={`h-24 w-20 overflow-hidden bg-secondary ring-1 transition-all ${
                  hero === i ? "ring-foreground" : "ring-transparent"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="aspect-[4/5] flex-1 overflow-hidden bg-secondary">
            <img
              src={product.images[hero] ?? product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="eyebrow text-muted-foreground">{product.category}</span>
          <h1 className="mt-4 text-4xl leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg tabular-nums">{money(product.price)}</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.blurb}</p>

          <div className="mt-9">
            <span className="eyebrow">Colour — {color}</span>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`h-8 w-8 rounded-full ring-1 ring-inset ring-foreground/15 transition-all ${
                    color === c.name ? "outline outline-1 outline-offset-2 outline-foreground" : ""
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <span className="eyebrow">Size</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-11 w-14 border text-xs transition-colors ${
                    size === s
                      ? "border-foreground bg-primary text-primary-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-border">
              <button
                className="p-3"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
              <button className="p-3" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              className="h-12 flex-1 rounded-none text-[11px] font-semibold uppercase tracking-[0.2em]"
              onClick={() => {
                add(product, size, color, qty);
                setOpen(true);
                toast.success("Added to bag", {
                  description: `${product.name} · ${color} · ${size} × ${qty}`,
                });
              }}
            >
              Add to cart
            </Button>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <h2 className="eyebrow">Fabric & construction</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.fabric}</p>
          </div>

          <ul className="mt-8 space-y-3 text-xs text-muted-foreground">
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-foreground" /> Carbon-audited delivery in 2–4 days
            </li>
            <li className="flex items-center gap-3">
              <RefreshCcw className="h-4 w-4 text-foreground" /> 30-day returns, free mending for
              life
            </li>
            <li className="flex items-center gap-3">
              <Leaf className="h-4 w-4 text-foreground" /> Mono-material and take-back eligible
            </li>
          </ul>
        </div>
      </div>

      <section className="mt-28 border-t border-border pt-14">
        <h2 className="text-2xl md:text-3xl">You may also like</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductMissing() {
  return (
    <div className="mx-auto max-w-lg px-5 py-40 text-center">
      <h1 className="text-3xl">This piece has sold out of the archive</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        The product you're looking for isn't part of the current catalog.
      </p>
      <Button className="mt-8 rounded-none" asChild>
        <Link to="/shop">Back to shop</Link>
      </Button>
    </div>
  );
}
