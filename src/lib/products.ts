export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  blurb: string;
  fabric: string;
  createdAt: string;
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

export const CATEGORIES = [
  "Minimalist Essentials",
  "Oversized Outerwear",
  "Aesthetic Accessories",
] as const;

export const SIZES = ["S", "M", "L", "XL"] as const;

const BONE = { name: "Bone", hex: "#e7e2d9" };
const CHARCOAL = { name: "Charcoal", hex: "#2f3033" };
const BLACK = { name: "Black", hex: "#111111" };
const CLAY = { name: "Clay", hex: "#a97a5f" };
const SLATE = { name: "Slate", hex: "#6b7280" };

export const COLOR_OPTIONS = [BONE, CHARCOAL, BLACK, CLAY, SLATE];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "heavyweight-boxy-hoodie",
    name: "Heavyweight Boxy Hoodie",
    price: 168,
    category: "Minimalist Essentials",
    colors: [CHARCOAL, BONE],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("photo-1556821840-3a63f95609a7"),
      u("photo-1620799140408-edc6dcb6d633"),
      u("photo-1618354691373-d851c5c3a990"),
    ],
    blurb: "Dense loopback fleece with a dropped shoulder and squared hem.",
    fabric:
      "500 GSM organic cotton loopback fleece, garment-dyed for depth and washed twice to eliminate shrinkage. Ribbed cuffs with 4% elastane for recovery.",
    createdAt: "2026-08-01",
  },
  {
    id: "2",
    slug: "raw-denim-cargo-pants",
    name: "Raw Denim Cargo Pants",
    price: 214,
    category: "Minimalist Essentials",
    colors: [SLATE, BLACK],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("photo-1541099649105-f69ad21f3246"),
      u("photo-1594633312681-425c7b97ccd1"),
      u("photo-1552374196-c4e7ffc6e126"),
    ],
    blurb: "Unsanforized 14oz denim with bellowed utility pockets.",
    fabric:
      "14oz unsanforized selvedge denim woven on shuttle looms in Okayama. Bar-tacked stress points, copper hardware, unlined pockets in undyed twill.",
    createdAt: "2026-07-22",
  },
  {
    id: "3",
    slug: "unstructured-wool-blazer",
    name: "Unstructured Wool Blazer",
    price: 398,
    category: "Oversized Outerwear",
    colors: [CHARCOAL, CLAY],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("photo-1591047139829-d91aecb6caea"),
      u("photo-1521572163474-6864f9cf17ab"),
      u("photo-1490114538077-0a7f8cb49891"),
    ],
    blurb: "Softly tailored, canvas-free, cut long through the body.",
    fabric:
      "Mid-weight Italian virgin wool with a dry hand. No shoulder pad, no chest canvas — only a half-lining in cupro for glide.",
    createdAt: "2026-08-14",
  },
  {
    id: "4",
    slug: "oversized-waffle-knit-tee",
    name: "Oversized Waffle Knit Tee",
    price: 92,
    category: "Minimalist Essentials",
    colors: [BONE, BLACK],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("photo-1521572267360-ee0c2909d518"),
      u("photo-1523381210434-271e8be1f52b"),
      u("photo-1503342217505-b0a15ec3261c"),
    ],
    blurb: "Textured thermal knit with a relaxed, boxy silhouette.",
    fabric:
      "Long-staple cotton in a 3mm waffle structure. Self-fabric neck tape, tubular body with no side seams.",
    createdAt: "2026-08-20",
  },
  {
    id: "5",
    slug: "double-faced-wool-overcoat",
    name: "Double-Faced Wool Overcoat",
    price: 640,
    category: "Oversized Outerwear",
    colors: [CHARCOAL, BLACK],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("photo-1539533018447-63fcce2678e3"),
      u("photo-1544022613-e87ca75a784a"),
      u("photo-1483985988355-763728e1935b"),
    ],
    blurb: "Hand-finished, reversible construction with no visible lining.",
    fabric:
      "Two layers of Japanese wool-alpaca bonded and hand-stitched at the edges. Weighted drape, mid-calf length, patch pockets.",
    createdAt: "2026-06-30",
  },
  {
    id: "6",
    slug: "technical-shell-anorak",
    name: "Technical Shell Anorak",
    price: 320,
    category: "Oversized Outerwear",
    colors: [SLATE, BONE],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("photo-1551028719-00167b16eac5"),
      u("photo-1547949003-9792a18a2601"),
      u("photo-1445205170230-053b83016050"),
    ],
    blurb: "Sealed-seam membrane shell with a half-zip storm placket.",
    fabric:
      "Recycled 3-layer polyester membrane, 20k/20k breathability, PFC-free DWR finish. Fully taped seams and a stowable hood.",
    createdAt: "2026-08-06",
  },
  {
    id: "7",
    slug: "brushed-mohair-scarf",
    name: "Brushed Mohair Scarf",
    price: 118,
    category: "Aesthetic Accessories",
    colors: [CLAY, BONE],
    sizes: ["M"],
    images: [
      u("photo-1520903920243-00d872a2d1c9"),
      u("photo-1457972729786-0411a3b2b626"),
      u("photo-1434389677669-e08b4cac3105"),
    ],
    blurb: "Featherlight halo knit, brushed by hand on both faces.",
    fabric:
      "62% kid mohair, 30% merino, 8% nylon core. Loose gauge for volume without weight, finished with hand-knotted fringe.",
    createdAt: "2026-07-11",
  },
  {
    id: "8",
    slug: "structured-canvas-tote",
    name: "Structured Canvas Tote",
    price: 145,
    category: "Aesthetic Accessories",
    colors: [BONE, BLACK],
    sizes: ["L"],
    images: [
      u("photo-1590874103328-eac38a683ce7"),
      u("photo-1594223274512-ad4803739b7c"),
      u("photo-1548036328-c9fa89d128fa"),
    ],
    blurb: "Boxed base, magnetic closure, holds its shape empty.",
    fabric:
      "22oz waxed cotton canvas with vegetable-tanned leather handles. Riveted stress points and an interior slip pocket in herringbone.",
    createdAt: "2026-08-18",
  },
  {
    id: "9",
    slug: "pleated-wide-leg-trouser",
    name: "Pleated Wide-Leg Trouser",
    price: 236,
    category: "Minimalist Essentials",
    colors: [CHARCOAL, CLAY],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("photo-1473966968600-fa801b869a1a"),
      u("photo-1519058082700-08a0b56da9b4"),
      u("photo-1487222477894-8943e31ef7b2"),
    ],
    blurb: "Single forward pleat, high rise, generous through the leg.",
    fabric:
      "Dry-finished wool-linen blend with a matte surface. Extended waistband tab, French-seamed pockets, unfinished hem for tailoring.",
    createdAt: "2026-08-25",
  },
  {
    id: "10",
    slug: "minimal-leather-belt",
    name: "Minimal Leather Belt",
    price: 96,
    category: "Aesthetic Accessories",
    colors: [BLACK, CLAY],
    sizes: ["S", "M", "L"],
    images: [
      u("photo-1553062407-98eeb64c6a62"),
      u("photo-1611085583191-a3b181a88401"),
      u("photo-1618354691792-d1d42acfd860"),
    ],
    blurb: "Single-piece strap with a brushed, keeperless buckle.",
    fabric:
      "3.5mm vegetable-tanned cowhide from a Tuscan tannery, edge-burnished by hand. Solid brass buckle with a matte-blasted finish.",
    createdAt: "2026-05-19",
  },
];

export const priceRange = { min: 80, max: 700 };

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const money2 = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
