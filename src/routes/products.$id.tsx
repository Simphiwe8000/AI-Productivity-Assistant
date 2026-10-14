import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { QtyStepper } from "@/components/site/CartDrawer";
import { getCategory, getProduct, products } from "@/lib/products";
import { formatZAR, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Everyday Essentials` },
          { name: "description", content: loaderData.product.short },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.short },
        ]
      : [{ title: "Product not found — Everyday Essentials" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product.variants?.[0]);
  const { add } = useCart();
  const cat = getCategory(product.category)!;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const out = product.stock <= 0;

  return (
    <div className="container-page py-10">
      <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
        <Link to="/shop" search={{ category: cat.id }} className="hover:text-primary">{cat.name}</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg bg-cream">
            <img src={product.images[img]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((src, i) => (
                <button key={i} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`}
                  className={`h-20 w-20 overflow-hidden rounded-md border-2 ${i === img ? "border-primary" : "border-transparent"}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="eyebrow">{cat.name}</p>
          <h1 className="mt-2 text-4xl text-primary">{product.name}</h1>
          <p className="mt-4 text-2xl">{formatZAR(product.price)}</p>
          <p className={`mt-2 text-sm ${out ? "text-destructive" : "text-sage"}`}>
            {out ? "Out of stock" : product.stock < 10 ? `Only ${product.stock} left` : "In stock"} <span className="text-muted-foreground">(demo stock)</span>
          </p>
          <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

          {product.variants && (
            <fieldset className="mt-8">
              <legend className="mb-3 text-sm font-medium">Option: {variant}</legend>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button key={v} onClick={() => setVariant(v)} aria-pressed={v === variant}
                    className={`rounded-md border px-4 py-2 text-sm ${v === variant ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{v}</button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-8 flex items-center gap-4">
            <QtyStepper value={qty} max={Math.max(1, product.stock)} onChange={setQty} />
            <Button size="lg" className="flex-1" disabled={out} onClick={() => add(product, qty, variant)}>
              {out ? "Out of stock" : "Add to Cart"}
            </Button>
          </div>

          <div className="mt-8 space-y-3 rounded-lg bg-cream p-5 text-sm">
            <p className="flex gap-3"><Truck className="h-5 w-5 text-sage" /> Delivery in 3–5 working days across South Africa. Free over {formatZAR(FREE_SHIPPING_THRESHOLD)}.</p>
            <p className="flex gap-3"><RotateCcw className="h-5 w-5 text-sage" /> 30-day returns on unused items.</p>
          </div>

          <h2 className="mt-10 text-xl text-primary">Specifications</h2>
          <dl className="mt-3 divide-y border-y text-sm">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between py-3"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-muted-foreground">No customer reviews yet.</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 text-3xl text-primary">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
