import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — AURA Studio" },
      {
        name: "description",
        content:
          "How AURA Studio grew from a two-person Copenhagen workshop into a circular-design label producing garments in runs of three hundred.",
      },
      { property: "og:title", content: "Our Story — AURA Studio" },
      {
        property: "og:description",
        content: "A Copenhagen label built on circular design and ethical textiles.",
      },
    ],
  }),
  component: About,
});

const TIMELINE = [
  {
    year: "2019",
    title: "A borrowed workshop",
    body: "Ida Sørensen and Rafael Mena begin cutting samples after hours in a shared Kødbyen studio, working only with deadstock jersey from a shuttered Danish mill.",
  },
  {
    year: "2021",
    title: "The first run of three hundred",
    body: "The Heavyweight Boxy Hoodie sells through in nine days. The pair commit to a hard cap of 300 units per style — a limit they have never lifted.",
  },
  {
    year: "2023",
    title: "Designed for disassembly",
    body: "AURA rebuilds its pattern library around mono-material construction: no bonded blends, no glued seams, mechanical fastenings only.",
  },
  {
    year: "2026",
    title: "Take-back at scale",
    body: "94% of the current line returns to yarn through the AURA take-back programme. Eleven partner mills publish living-wage data annually.",
  },
];

function About() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <span className="eyebrow text-muted-foreground">Since 2019 — Copenhagen</span>
          <h1 className="display-xl mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)]">
            We started with one question: what happens to it after?
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 md:grid-cols-2 md:px-10">
        <div className="aspect-[4/5] overflow-hidden bg-secondary">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
            alt="The AURA Studio storefront in Copenhagen"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="md:pt-16">
          <p className="text-xl leading-relaxed md:text-2xl">
            AURA Studio makes a small number of garments extremely well, then takes them back when
            they wear out.
          </p>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Everything is designed in a former meatpacking hall in Copenhagen and produced within a
            900km radius. Our patterns are cut generously and tailored quietly — the intention is
            that a piece reads the same in 2036 as it does now. We publish our mill list, our unit
            counts and our repair volumes, because a claim about circularity without numbers is
            simply marketing.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            We have never held a sale. Instead, unsold stock returns to the fibre stream and comes
            back as the following season's yarn.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
          <h2 className="text-3xl md:text-4xl">The long version</h2>
          <ol className="mt-14 space-y-0">
            {TIMELINE.map((t) => (
              <li
                key={t.year}
                className="grid gap-4 border-t border-border py-10 md:grid-cols-[140px_1fr_1.2fr]"
              >
                <span className="font-display text-2xl">{t.year}</span>
                <h3 className="text-lg">{t.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-24 text-center md:px-10">
        <h2 className="mx-auto max-w-2xl text-3xl md:text-5xl">
          Three hundred pieces. Then it's gone.
        </h2>
        <Link
          to="/shop"
          className="mt-10 inline-flex h-12 items-center bg-primary px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
        >
          Shop the current series
        </Link>
      </section>
    </div>
  );
}
