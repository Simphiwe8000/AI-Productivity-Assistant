import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatZAR } from "@/lib/pricing";
import type { Product } from "@/lib/products";

export function ProductCard({ product, onQuickView }: { product: Product; onQuickView?: (p: Product) => void }) {
  const { add } = useCart();
  const out = product.stock <= 0;
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-cream">
        <Link to="/products/$id" params={{ id: product.id }}>
          <img src={product.images[0]} alt={product.name} loading="lazy" width={1024} height={1024}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
        {out && <span className="absolute left-3 top-3 rounded bg-background px-2 py-1 text-xs">Out of stock</span>}
        {onQuickView && (
          <button onClick={() => onQuickView(product)} aria-label={`Quick view ${product.name}`}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100">
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <Link to="/products/$id" params={{ id: product.id }} className="font-serif text-lg leading-snug hover:text-primary">
          {product.name}
        </Link>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{product.short}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="font-medium text-primary">{formatZAR(product.price)}</span>
          <Button size="sm" disabled={out} onClick={() => add(product, 1, product.variants?.[0])}>
            {out ? "Sold out" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}
