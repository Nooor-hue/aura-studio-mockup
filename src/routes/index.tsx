import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURA Studio — Elevate Your Daily Ritual" },
      {
        name: "description",
        content:
          "Premium streetwear and modern fashion from AURA Studio. Circular design, ethical textiles, released in limited runs.",
      },
      { property: "og:title", content: "AURA Studio — Elevate Your Daily Ritual" },
      {
        property: "og:description",
        content: "Premium streetwear built on circular design and ethical textiles.",
      },
    ],
  }),
  component: Home,
});

const COLLECTIONS = [
  {
    title: "Minimalist Essentials",
    count: 4,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Oversized Outerwear",
    count: 3,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Aesthetic Accessories",
    count: 3,
    image:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=80",
  },
];

function Home() {
  const trending = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-border">
        <div className="mx-auto grid max-w-[1400px] items-end gap-10 px-5 pb-16 pt-20 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pb-24 md:pt-28">
          <div className="reveal">
            <span className="eyebrow text-muted-foreground">Autumn Series 04 — 2026</span>
            <h1 className="display-xl mt-6 text-[clamp(3rem,10vw,7.5rem)]">
              Elevate
              <br />
              Your Daily
              <br />
              Ritual
            </h1>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              Heavyweight cottons, unstructured tailoring and quiet hardware. Designed in
              Copenhagen, produced in runs of three hundred.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/shop"
                className="group inline-flex h-12 items-center gap-3 bg-primary px-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
              >
                Shop New Arrivals
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="eyebrow border-b border-foreground/30 pb-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                Our philosophy
              </Link>
            </div>
          </div>

          <div className="reveal relative aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80"
              alt="Model wearing an unstructured wool blazer from the AURA Studio autumn series"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-background px-5 py-3">
              <span className="eyebrow">Look 12 — Unstructured Wool</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl md:text-4xl">Curated collections</h2>
          <Link to="/shop" className="eyebrow shrink-0 text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.title}
              to="/shop"
              search={{ category: c.title }}
              className="group relative aspect-[4/5] overflow-hidden bg-secondary"
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-foreground/70 to-transparent p-5">
                <span className="font-display text-xl text-background">{c.title}</span>
                <span className="text-xs text-background/70">{c.count} pieces</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-muted-foreground">Most wanted</span>
              <h2 className="mt-3 text-3xl md:text-4xl">Trending now</h2>
            </div>
            <Link
              to="/shop"
              className="eyebrow shrink-0 text-muted-foreground hover:text-foreground"
            >
              All products
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
            {trending.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-32">
        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <div className="aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80"
              alt="Fabric swatches laid out in an AURA Studio atelier"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow text-muted-foreground">Brand philosophy</span>
            <h2 className="mt-5 max-w-xl text-3xl leading-tight md:text-5xl">
              Fewer garments, made to outlive the season that produced them.
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Every AURA piece begins with the end in mind. We design for disassembly — single-fibre
              panels, mechanical fastenings, no bonded blends — so that a worn-through hoodie
              returns to us as yarn rather than landfill.
            </p>
            <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {[
                ["Circular by design", "94% of our 2026 line is mono-material and take-back eligible."],
                ["Ethical textiles", "Eleven mills, all audited, all publishing living-wage data."],
                ["Limited runs", "Nothing exceeds 300 units. Nothing is ever discounted."],
                ["Repair, not replace", "Free mending for the lifetime of the garment."],
              ].map(([t, d]) => (
                <div key={t} className="border-t border-border pt-4">
                  <dt className="text-sm font-medium">{t}</dt>
                  <dd className="mt-2 text-xs leading-relaxed text-muted-foreground">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
