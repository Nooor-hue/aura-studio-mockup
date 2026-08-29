import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { money, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();

  return (
    <article className="group">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden bg-secondary"
      >
        <div className="relative aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:opacity-0"
          />
          <img
            src={product.images[1] ?? product.images[0]}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:opacity-100"
          />
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="text-sm font-medium leading-snug"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
          <div className="mt-2.5 flex gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3 w-3 rounded-full ring-1 ring-inset ring-foreground/15"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
        <span className="text-sm tabular-nums">{money(product.price)}</span>
      </div>

      <button
        onClick={() => {
          add(product);
          setOpen(true);
          toast.success("Added to bag", { description: product.name });
        }}
        className="mt-4 h-10 w-full border border-foreground/15 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Add to cart
      </button>
    </article>
  );
}
