import { Link, createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ORDER_HISTORY } from "@/lib/cart";
import { money2 } from "@/lib/products";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — AURA Studio" },
      {
        name: "description",
        content:
          "Your AURA Studio account: past orders, take-back credits and saved shipping details.",
      },
      { property: "og:title", content: "My Account — AURA Studio" },
      { property: "og:description", content: "Review your AURA Studio order history." },
    ],
  }),
  component: Account,
});

function Account() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-10">
      <span className="eyebrow text-muted-foreground">My account</span>
      <h1 className="mt-4 text-4xl md:text-5xl">Ida Sørensen</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Member since 2021 · ida@aurastudio.example
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          ["Orders placed", "12"],
          ["Take-back credits", "$140"],
          ["Pieces repaired", "3"],
        ].map(([k, v]) => (
          <div key={k} className="border border-border p-6">
            <p className="eyebrow text-muted-foreground">{k}</p>
            <p className="mt-3 font-display text-3xl">{v}</p>
          </div>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl">Order history</h2>
        <div className="mt-8 divide-y divide-border border-y border-border">
          {ORDER_HISTORY.map((o) => (
            <div
              key={o.id}
              className="grid gap-4 py-6 sm:grid-cols-[120px_1fr_120px_110px] sm:items-center"
            >
              <span className="text-sm font-medium tabular-nums">{o.id}</span>
              <div>
                <p className="text-sm">{o.items.join(", ")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{o.date}</p>
              </div>
              <span
                className={`eyebrow ${o.status === "Refunded" ? "text-muted-foreground" : "text-foreground"}`}
              >
                {o.status}
              </span>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="text-sm tabular-nums">{money2(o.total)}</span>
                <button
                  className="eyebrow text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    toast.success(`Tracking for ${o.id}`, {
                      description: "DK48120934AU · last scanned in Copenhagen",
                    })
                  }
                >
                  Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-2">
        <div className="border border-border p-6">
          <h2 className="eyebrow">Default shipping address</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Ida Sørensen
            <br />
            Flæsketorvet 68
            <br />
            1711 Copenhagen, Denmark
          </p>
          <Button
            variant="outline"
            className="mt-6 rounded-none"
            onClick={() => toast.success("Address saved")}
          >
            Update address
          </Button>
        </div>
        <div className="border border-border p-6">
          <h2 className="eyebrow">Take-back programme</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Send back any worn-through AURA piece and receive 20% of its original value as store
            credit.
          </p>
          <Button className="mt-6 rounded-none" asChild>
            <Link to="/shop">Spend credits</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
