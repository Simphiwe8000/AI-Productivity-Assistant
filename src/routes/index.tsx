import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, PackageCheck, Recycle, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { categories, heroImage, products } from "@/lib/products";
import sustainableImg from "@/assets/sustainable.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Everyday Essentials — Sustainable Home, Care & Lifestyle" },
      { name: "description", content: "Small changes, better everyday living. Shop reusable bottles, soy candles, natural care and more." },
      { property: "og:title", content: "Everyday Essentials — Sustainable Essentials" },
      { property: "og:description", content: "Thoughtfully selected essentials for your home, body and lifestyle." },
    ],
  }),
  component: Index,
});

const values = [
  { icon: Leaf, title: "Better for Everyday Living", text: "Useful products that make daily routines a little calmer." },
  { icon: PackageCheck, title: "Thoughtfully Selected Products", text: "A small range, chosen for how well it works and lasts." },
  { icon: Recycle, title: "Sustainable Choices", text: "Reusable and refillable options wherever we can find them." },
  { icon: ShieldCheck, title: "Quality You Can Trust", text: "Honest descriptions, clear prices and easy returns." },
];

const testimonials = [
  { quote: "The glass jars make my pantry feel so calm. Lovely quality.", name: "Sample customer, Cape Town" },
  { quote: "Swapped to the bamboo toothbrushes for the whole family — easy change.", name: "Sample customer, Durban" },
  { quote: "The soy candle smells beautiful and the jar is now a pen holder.", name: "Sample customer, Johannesburg" },
];

function Index() {
  const featured = products.slice(0, 8);
  const best = products.filter((p) => p.bestSeller);
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={heroImage} alt="Sustainable home products on a linen-covered table" width={1920} height={1088}
          className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="container-page relative py-24 md:py-36">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Quality Products for a Better You</p>
            <h1 className="text-5xl leading-[1.05] text-primary md:text-6xl">Small Changes. Better Everyday Living.</h1>
            <p className="mt-6 text-lg text-foreground/80">Discover thoughtfully selected essentials for your home, body, and lifestyle.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/shop">Shop All Products</Link></Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/shop" search={{ category: "sustainable-living" }}>Explore Sustainable Living</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-2">Shop by category</p>
          <h2 className="text-3xl text-primary md:text-4xl">Find your essentials</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.id} to="/shop" search={{ category: c.id }} className="group relative aspect-[4/5] overflow-hidden rounded-lg">
              <img src={c.image} alt="" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 p-5 text-primary-foreground">
                <h3 className="text-2xl">{c.name}</h3>
                <p className="mt-1 text-sm opacity-85">{c.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm">Shop now <ArrowRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">Featured</p>
            <h2 className="text-3xl text-primary md:text-4xl">Featured products</h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-primary underline-offset-4 hover:underline sm:block">View all</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="container-page grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title}>
              <v.icon className="h-8 w-8 text-sage" strokeWidth={1.5} />
              <h3 className="mt-4 text-xl text-primary">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mb-10">
          <p className="eyebrow mb-2">Loved by customers</p>
          <h2 className="text-3xl text-primary md:text-4xl">Best sellers</h2>
        </div>
        <div className="-mx-5 flex snap-x gap-6 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
          {best.map((p) => (
            <div key={p.id} className="w-64 shrink-0 snap-start md:w-72"><ProductCard product={p} /></div>
          ))}
        </div>
      </section>

      <section className="container-page">
        <div className="grid overflow-hidden rounded-xl bg-primary text-primary-foreground md:grid-cols-2">
          <img src={sustainableImg} alt="Reusable bags and beeswax wraps with fresh produce" loading="lazy" width={1024} height={1024} className="h-full max-h-[520px] w-full object-cover" />
          <div className="flex flex-col justify-center p-10 md:p-14">
            <p className="eyebrow mb-3">Our approach</p>
            <h2 className="text-3xl md:text-4xl">Good Products. A Brighter Tomorrow.</h2>
            <p className="mt-5 text-primary-foreground/80">We favour reusable products over single-use ones, choose glass and refillable bottles where we can, and keep packaging simple.</p>
            <p className="mt-3 text-primary-foreground/80">Mindful consumption means buying less, but better. We only describe environmental benefits we can back up.</p>
            <div className="mt-8"><Button asChild variant="secondary"><Link to="/about">Read our story</Link></Button></div>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-2">Kind words</p>
          <h2 className="text-3xl text-primary md:text-4xl">What customers say</h2>
          <p className="mt-2 text-xs text-muted-foreground">Sample testimonials shown until real reviews are collected.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.quote} className="rounded-lg bg-card p-8 shadow-soft">
              <blockquote className="font-serif text-lg leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container-page">
        <div className="rounded-xl bg-accent px-6 py-14 text-center md:px-16">
          <h2 className="text-3xl text-primary md:text-4xl">A Little Goodness in Your Inbox.</h2>
          <p className="mx-auto mt-3 max-w-md text-foreground/75">New arrivals, simple swaps and the occasional offer.</p>
          <div className="mx-auto mt-8 max-w-md text-left"><NewsletterForm /></div>
        </div>
      </section>
    </>
  );
}
