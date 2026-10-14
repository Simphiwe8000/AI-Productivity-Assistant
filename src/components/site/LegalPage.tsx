import { PageHeader } from "./PageHeader";

export function LegalPage({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <>
      <PageHeader title={title} intro="Draft placeholder text for this demo store — to be reviewed before launch." />
      <div className="container-page max-w-3xl space-y-8 py-16">
        {sections.map(([h, p]) => (
          <section key={h}>
            <h2 className="text-2xl text-primary">{h}</h2>
            <p className="mt-2 leading-relaxed text-foreground/80">{p}</p>
          </section>
        ))}
      </div>
    </>
  );
}
