import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import type { CategoryId } from "@/lib/products";

const nav: { label: string; category?: CategoryId; to?: string }[] = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Personal Care", category: "personal-care" },
  { label: "Lifestyle", category: "lifestyle" },
  { label: "Sustainable Living", category: "sustainable-living" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {nav.map((n) =>
        n.category ? (
          <Link key={n.label} to="/shop" search={{ category: n.category }} onClick={onClick}
            className="text-sm text-foreground/80 transition-colors hover:text-primary">
            {n.label}
          </Link>
        ) : (
          <Link key={n.label} to={n.to!} onClick={onClick} activeOptions={{ exact: true }}
            className="text-sm text-foreground/80 transition-colors hover:text-primary [&.active]:text-primary [&.active]:font-medium">
            {n.label}
          </Link>
        ),
      )}
    </>
  );

  return (
    <>
      <div className="bg-primary py-2 text-center text-xs tracking-wide text-primary-foreground">
        Thoughtful essentials for a better everyday.
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <button className="lg:hidden" aria-label="Open menu" onClick={() => setMenu(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            <NavLinks />
          </nav>
          <div className="flex items-center gap-4 text-foreground">
            <button aria-label="Search" onClick={() => setSearching((s) => !s)} className="hover:text-primary">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/about" aria-label="Account" className="hidden hover:text-primary sm:block">
              <User className="h-5 w-5" />
            </Link>
            <button aria-label={`Cart, ${count} items`} onClick={() => setOpen(true)} className="relative hover:text-primary">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
        {searching && (
          <form
            className="container-page pb-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSearching(false);
              navigate({ to: "/shop", search: { q: q.trim() || undefined } });
            }}
          >
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <input id="site-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search bottles, candles, wraps…"
              className="w-full rounded-md border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </form>
        )}
      </header>
      {menu && (
        <div className="fixed inset-0 z-50 bg-foreground/30 lg:hidden" onClick={() => setMenu(false)}>
          <div className="h-full w-72 bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-8 flex items-center justify-between">
              <span className="font-serif text-lg text-primary">Menu</span>
              <button aria-label="Close menu" onClick={() => setMenu(false)}><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex flex-col gap-5" aria-label="Mobile">
              <NavLinks onClick={() => setMenu(false)} />
              <Link to="/about" onClick={() => setMenu(false)} className="text-sm">About</Link>
              <Link to="/contact" onClick={() => setMenu(false)} className="text-sm">Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
