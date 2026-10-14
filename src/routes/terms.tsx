import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Everyday Essentials" },
      { name: "description", content: "Terms for shopping with Everyday Essentials." },
      { property: "og:title", content: "Terms & Conditions — Everyday Essentials" },
      { property: "og:description", content: "Terms for shopping with Everyday Essentials." },
    ],
  }),
  component: () => (
    <LegalPage title="Terms & Conditions" sections={[
      ["Orders", "Orders are confirmed once payment is received. This demo store does not process real orders."],
      ["Pricing", "All prices are in South African rand (ZAR) and include VAT where applicable."],
      ["Product information", "We aim to describe products accurately. Images are illustrative."],
    ]} />
  ),
});
