import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="max-w-sm text-3xl leading-tight">
              Quiet releases, sent before they sell out.
            </h3>
            <form
              className="mt-8 flex max-w-md gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) {
                  toast.error("Enter a valid email address.");
                  return;
                }
                toast.success("You're on the list", {
                  description: `We'll write to ${email} before the next drop.`,
                });
                setEmail("");
              }}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-11 rounded-none border-foreground/20 bg-transparent"
                aria-label="Email address"
              />
              <Button type="submit" className="h-11 rounded-none px-6">
                Subscribe
              </Button>
            </form>
          </div>

          <div className="eyebrow flex flex-col gap-3 text-muted-foreground">
            <span className="text-foreground">Browse</span>
            <Link to="/shop" className="transition-colors hover:text-foreground">
              All products
            </Link>
            <Link to="/about" className="transition-colors hover:text-foreground">
              Our story
            </Link>
            <Link to="/account" className="transition-colors hover:text-foreground">
              My account
            </Link>
          </div>

          <div className="eyebrow flex flex-col gap-3 text-muted-foreground">
            <span className="text-foreground">Studio</span>
            <span>Copenhagen — Kødbyen 4</span>
            <span>hello@aurastudio.example</span>
            <span>Mon–Fri, 09–17 CET</span>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:justify-between">
          <span>© 2026 AURA Studio. A fictional brand, built as a demo.</span>
          <span>Circular design · Ethical textiles · Carbon-audited freight</span>
        </div>
      </div>
    </footer>
  );
}
