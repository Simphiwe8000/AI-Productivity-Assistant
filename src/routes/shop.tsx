import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SearchX } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { categories, products, type Product } from "@/lib/products";
import { formatZAR } from "@/lib/pricing";
import { useCart } from "@/lib/cart";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.enum(["home-essentials", "personal-care", "lifestyle", "sustainable-living"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop All Products — Everyday Essentials" },
      { name: "description", content: "Browse sustainable home essentials, personal care and lifestyle products in rand." },
      { property: "og:title", content: "Shop — Everyday Essentials" },
      { property: "og:description", content: "Search and filter thoughtfully selected everyday essentials." },
    ],
  }),
  component: Shop,
});

const PAGE = 8;
const MAX = 500;

function Shop() {
  const { q = "", category } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("popular");
  const [shown, setShown] = useState(PAGE);
  const [quick, setQuick] = useState<Product | null>(null);
  const { add } = useCart();

  const list = useMemo(() => {
    const term = q.toLowerCase().trim();
    const r = products.filter(
      (p) =>
        (!category || p.category === category) &&
        p.price <= maxPrice &&
        (!inStock || p.stock > 0) &&
        (!term || `${p.name} ${p.short} ${p.description}`.toLowerCase().includes(term)),
    );
    return [...r].sort((a, b) =>
      sort === "price-asc" ? a.price - b.price
      : sort === "price-desc" ? b.price - a.price
      : sort === "newest" ? b.addedAt.localeCompare(a.addedAt)
      : b.popularity - a.popularity,
    );
  }, [q, category, maxPrice, inStock, sort]);

  const set = (s: Partial<z.infer<typeof searchSchema>>) => {
    setShown(PAGE);
    navigate({ search: (prev) => ({ ...prev, ...s }), replace: true });
  };
  const title = category ? categories.find((c) => c.id === category)!.name : "Shop All Products";

  return (
    <>
      <PageHeader eyebrow="The collection" title={title} intro="Everyday essentials, thoughtfully selected. Prices and stock shown are demo samples." />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8" aria-label="Filters">
          <div>
            <label htmlFor="shop-q" className="mb-2 block text-sm font-medium">Search</label>
            <input id="shop-q" value={q} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Search products"
              className="h-10 w-full rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Category</legend>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              <button onClick={() => set({ category: undefined })} className={`text-sm ${!category ? "font-medium text-primary" : "text-muted-foreground hover:text-primary"}`}>All</button>
              {categories.map((c) => (
                <button key={c.id} onClick={() => set({ category: c.id })}
                  className={`text-sm ${category === c.id ? "font-medium text-primary" : "text-muted-foreground hover:text-primary"}`}>{c.name}</button>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="shop-price" className="mb-2 block text-sm font-medium">Max price: {formatZAR(maxPrice)}</label>
            <input id="shop-price" type="range" min={100} max={MAX} step={10} value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-primary" />
            In stock only
          </label>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground" aria-live="polite">{list.length} products</p>
            <label className="flex items-center gap-2 text-sm">
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 rounded-md border bg-card px-2">
                <option value="popular">Popularity</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>
          {list.length === 0 ? (
            <div className="rounded-lg border border-dashed py-20 text-center">
              <SearchX className="mx-auto h-10 w-10 text-sage" />
              <p className="mt-4 font-serif text-xl">No products match your filters</p>
              <Button variant="outline" className="mt-6" onClick={() => { setMaxPrice(MAX); setInStock(false); set({ q: undefined, category: undefined }); }}>Clear filters</Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {list.slice(0, shown).map((p) => <ProductCard key={p.id} product={p} onQuickView={setQuick} />)}
              </div>
              {shown < list.length && (
                <div className="mt-10 text-center"><Button variant="outline" size="lg" onClick={() => setShown((s) => s + PAGE)}>Load more</Button></div>
              )}
            </>
          )}
        </div>
      </div>

      <Dialog open={!!quick} onOpenChange={(o) => !o && setQuick(null)}>
        <DialogContent className="max-w-3xl bg-background p-0">
          {quick && (
            <div className="grid md:grid-cols-2">
              <img src={quick.images[0]} alt={quick.name} className="h-full w-full object-cover" />
              <div className="p-8">
                <DialogTitle className="font-serif text-2xl">{quick.name}</DialogTitle>
                <p className="mt-2 text-lg text-primary">{formatZAR(quick.price)}</p>
                <DialogDescription className="mt-4">{quick.description}</DialogDescription>
                <p className="mt-4 text-sm">{quick.stock > 0 ? `In stock (${quick.stock})` : "Out of stock"}</p>
                <div className="mt-6 flex flex-col gap-2">
                  <Button disabled={quick.stock <= 0} onClick={() => { add(quick, 1, quick.variants?.[0]); setQuick(null); }}>Add to Cart</Button>
                  <Button asChild variant="outline"><Link to="/products/$id" params={{ id: quick.id }}>View details</Link></Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
