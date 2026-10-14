import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Everyday Essentials" },
      { name: "description", content: "How Everyday Essentials handles your personal information." },
      { property: "og:title", content: "Privacy Policy — Everyday Essentials" },
      { property: "og:description", content: "How we handle your personal information." },
    ],
  }),
  component: () => (
    <LegalPage title="Privacy Policy" sections={[
      ["What we collect", "Only what's needed to process orders and reply to you: name, contact details and delivery address."],
      ["How we use it", "To fulfil orders, provide support and, if you opt in, send our newsletter. We never sell your data."],
      ["Payments", "We do not store card details. Payments will be handled by a certified payment provider."],
      ["Your rights", "You may request access to, correction of, or deletion of your information at any time, in line with POPIA."],
    ]} />
  ),
});
