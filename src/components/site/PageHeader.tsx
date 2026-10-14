export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <section className="border-b bg-cream">
      <div className="container-page py-14 md:py-20">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-4xl text-primary md:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}
