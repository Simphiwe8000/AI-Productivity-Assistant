import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import img from "@/assets/home.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Everyday Essentials" },
      { name: "description", content: "The story behind Everyday Essentials and our focus on quality, thoughtful products." },
      { property: "og:title", content: "About Everyday Essentials" },
      { property: "og:description", content: "Quality products for a better you." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="Our story" title="Quality Products for a Better You" />
      <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2">
        <img src={img} alt="Glass storage jars on a wooden shelf" loading="lazy" className="rounded-lg" />
        <div className="space-y-5 text-foreground/80">
          <p>Everyday Essentials began with a simple idea: the things you use every day should be good to use, good to look at, and built to last.</p>
          <p>We keep our range small on purpose. Each product is chosen for how well it works, how long it lasts, and whether it helps you waste a little less — reusable bottles, refillable glass, natural fabrics.</p>
          <p>We'd rather tell you less than overstate. If we describe an environmental benefit, it's one we can stand behind.</p>
          <Button asChild><Link to="/shop">Explore the collection</Link></Button>
        </div>
      </div>
    </>
  );
}
