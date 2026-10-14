import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Everyday Essentials" },
      { name: "description", content: "Delivery times, shipping costs and returns at Everyday Essentials." },
      { property: "og:title", content: "Shipping & Returns — Everyday Essentials" },
      { property: "og:description", content: "Delivery times, costs and our returns policy." },
    ],
  }),
  component: () => (
    <LegalPage title="Shipping & Returns" sections={[
      ["Standard delivery", "3–5 working days across South Africa. R 85.00, free on orders over R 750.00."],
      ["Express delivery", "1–2 working days to main centres. R 150.00."],
      ["Returns", "Return unused items within 30 days for a refund or exchange."],
    ]} />
  ),
});
