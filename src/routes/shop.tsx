import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/product-card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, COLOR_OPTIONS, PRODUCTS, SIZES, money, priceRange } from "@/lib/products";

type Search = { category?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: typeof search["category"] === "string" ? (search["category"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — AURA Studio" },
      {
        name: "description",
        content:
          "Browse the full AURA Studio catalog: heavyweight knits, raw denim, unstructured tailoring and accessories. Filter by category, size, colour and price.",
      },
      { property: "og:title", content: "Shop All — AURA Studio" },
      {
        property: "og:description",
        content: "Filter the full AURA Studio catalog by category, size, colour and price.",
      },
    ],
  }),
  component: Shop,
});

type Sort = "newest" | "asc" | "desc";

function Shop() {
  const { category } = Route.useSearch();
  const [cats, setCats] = useState<string[]>(category ? [category] : []);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [max, setMax] = useState(priceRange.max);
  const [sort, setSort] = useState<Sort>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (arr: string[], v: string) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const products = useMemo(() => {
    const out = PRODUCTS.filter(
      (p) =>
        (cats.length === 0 || cats.includes(p.category)) &&
        (sizes.length === 0 || p.sizes.some((s) => sizes.includes(s))) &&
        (colors.length === 0 || p.colors.some((c) => colors.includes(c.name))) &&
        p.price <= max,
    );
    return out.sort((a, b) =>
      sort === "asc"
        ? a.price - b.price
        : sort === "desc"
          ? b.price - a.price
          : b.createdAt.localeCompare(a.createdAt),
    );
  }, [cats, sizes, colors, max, sort]);

  const active = cats.length + sizes.length + colors.length + (max < priceRange.max ? 1 : 0);

  const filters = (
    <div className="space-y-10">
      <FilterGroup label="Category">
        {CATEGORIES.map((c) => (
          <Check key={c} label={c} on={cats.includes(c)} onClick={() => setCats(toggle(cats, c))} />
        ))}
      </FilterGroup>

      <FilterGroup label="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSizes(toggle(sizes, s))}
              className={`h-9 w-11 border text-xs transition-colors ${
                sizes.includes(s)
                  ? "border-foreground bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Colour">
        <div className="flex flex-wrap gap-3">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.name}
              onClick={() => setColors(toggle(colors, c.name))}
              title={c.name}
              aria-label={c.name}
              className={`h-7 w-7 rounded-full ring-1 ring-inset ring-foreground/15 transition-all ${
                colors.includes(c.name) ? "outline outline-1 outline-offset-2 outline-foreground" : ""
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Price range">
        <Slider
          value={[max]}
          min={priceRange.min}
          max={priceRange.max}
          step={10}
          onValueChange={(v) => setMax(v[0] ?? priceRange.max)}
        />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>{money(priceRange.min)}</span>
          <span className="text-foreground">Up to {money(max)}</span>
        </div>
      </FilterGroup>

      {active > 0 && (
        <button
          onClick={() => {
            setCats([]);
            setSizes([]);
            setColors([]);
            setMax(priceRange.max);
          }}
          className="eyebrow border-b border-foreground/30 pb-1 text-muted-foreground hover:text-foreground"
        >
          Clear all ({active})
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10">
      <header className="border-b border-border pb-10">
        <span className="eyebrow text-muted-foreground">Catalog</span>
        <h1 className="mt-4 text-4xl md:text-6xl">All pieces</h1>
        <p className="mt-4 max-w-lg text-sm text-muted-foreground">
          Ten garments and objects, each produced in a run of three hundred.
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>

        <div>
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFiltersOpen(true)}
                className="eyebrow flex items-center gap-2 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters {active > 0 && `(${active})`}
              </button>
              <span className="text-xs text-muted-foreground">
                {products.length} {products.length === 1 ? "product" : "products"}
              </span>
            </div>
            <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
              <SelectTrigger className="h-9 w-[190px] rounded-none border-border text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {products.length === 0 ? (
            <p className="py-24 text-center text-sm text-muted-foreground">
              Nothing matches those filters yet.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-14 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setFiltersOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-background p-6">
            <div className="flex items-center justify-between pb-8">
              <span className="eyebrow">Filters</span>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            {filters}
          </aside>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-4 border-b border-border pb-3">{label}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Check({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 text-left text-sm">
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
          on ? "border-foreground bg-primary" : "border-border"
        }`}
      >
        {on && <span className="h-1.5 w-1.5 bg-primary-foreground" />}
      </span>
      <span className={on ? "" : "text-muted-foreground"}>{label}</span>
    </button>
  );
}
