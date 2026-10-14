import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatZAR } from "@/lib/pricing";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Everyday Essentials" },
      { name: "description", content: "Thank you for your order." },
      { property: "og:title", content: "Order Confirmed — Everyday Essentials" },
      { property: "og:description", content: "Thank you for shopping with Everyday Essentials." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confirmation,
});

type Order = { id: string; name: string; email: string; total: number; items: { name: string; qty: number }[] };

function Confirmation() {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    const s = sessionStorage.getItem("ee-last-order");
    if (s) setOrder(JSON.parse(s));
  }, []);
  return (
    <div className="container-page max-w-xl py-24 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-sage" strokeWidth={1.4} />
      <h1 className="mt-6 text-4xl text-primary">Thank you{order ? `, ${order.name}` : ""}</h1>
      <p className="mt-3 text-muted-foreground">This was a demo order — no payment was taken.</p>
      {order && (
        <div className="mt-8 rounded-lg bg-card p-6 text-left text-sm shadow-soft">
          <p className="mb-3">Order reference <strong>{order.id}</strong></p>
          <ul className="space-y-1">{order.items.map((i) => <li key={i.name}>{i.name} × {i.qty}</li>)}</ul>
          <p className="mt-4 border-t pt-4 font-medium">Total {formatZAR(order.total)}</p>
        </div>
      )}
      <Button asChild size="lg" className="mt-8"><Link to="/shop">Continue shopping</Link></Button>
    </div>
  );
}
