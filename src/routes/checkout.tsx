import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { calcTotals, formatZAR, type DeliveryMethod, EXPRESS_SHIPPING, STANDARD_SHIPPING, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Everyday Essentials" },
      { name: "description", content: "Complete your Everyday Essentials order." },
      { property: "og:title", content: "Checkout — Everyday Essentials" },
      { property: "og:description", content: "Secure demo checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  firstName: z.string().trim().min(1, "Required").max(60),
  lastName: z.string().trim().min(1, "Required").max(60),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[+0-9 ]{9,15}$/, "Enter a valid phone number"),
  address: z.string().trim().min(3, "Required").max(200),
  city: z.string().trim().min(2, "Required").max(80),
  province: z.string().trim().min(2, "Required").max(80),
  postal: z.string().trim().regex(/^\d{4}$/, "4-digit postal code"),
});
type Form = z.infer<typeof schema>;
const fields: { name: keyof Form; label: string; type?: string; half?: boolean }[] = [
  { name: "firstName", label: "First name", half: true },
  { name: "lastName", label: "Last name", half: true },
  { name: "email", label: "Email", type: "email", half: true },
  { name: "phone", label: "Phone", type: "tel", half: true },
  { name: "address", label: "Street address" },
  { name: "city", label: "City", half: true },
  { name: "province", label: "Province", half: true },
  { name: "postal", label: "Postal code", half: true },
];

function Checkout() {
  const { lines, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<DeliveryMethod>("standard");
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const totals = calcTotals(lines.map((l) => ({ price: l.product.price, qty: l.qty })), method);

  if (lines.length === 0)
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl text-primary">Your cart is empty</h1>
        <Button asChild className="mt-6"><Link to="/shop">Continue shopping</Link></Button>
      </div>
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(values);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Form] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const order = {
      id: "EE-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      name: r.data.firstName,
      email: r.data.email,
      total: totals.total,
      items: lines.map((l) => ({ name: l.product.name, qty: l.qty })),
    };
    sessionStorage.setItem("ee-last-order", JSON.stringify(order));
    setTimeout(() => {
      clear();
      navigate({ to: "/order-confirmation" });
    }, 600);
  };

  return (
    <div className="container-page py-12">
      <h1 className="text-4xl text-primary">Checkout</h1>
      <div className="mt-4 flex gap-3 rounded-md border border-beige bg-accent/50 p-4 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Demo checkout — no payment is taken and no real order is placed. Card payments will be enabled once a payment provider is connected.</p>
      </div>
      <form noValidate onSubmit={submit} className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-5 text-2xl">Contact & shipping</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
                  <label htmlFor={f.name} className="mb-1.5 block text-sm">{f.label}</label>
                  <input id={f.name} type={f.type ?? "text"} value={values[f.name] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                    aria-invalid={!!errors[f.name]}
                    className="h-11 w-full rounded-md border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring aria-[invalid=true]:border-destructive" />
                  {errors[f.name] && <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>}
                </div>
              ))}
            </div>
          </section>
          <fieldset>
            <legend className="mb-5 font-serif text-2xl">Delivery method</legend>
            <div className="grid gap-3">
              {([
                ["standard", "Standard (3–5 working days)", totals.subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : formatZAR(STANDARD_SHIPPING)],
                ["express", "Express (1–2 working days)", formatZAR(EXPRESS_SHIPPING)],
              ] as const).map(([v, label, price]) => (
                <label key={v} className={`flex cursor-pointer items-center justify-between rounded-md border p-4 ${method === v ? "border-primary bg-card" : ""}`}>
                  <span className="flex items-center gap-3 text-sm">
                    <input type="radio" name="method" checked={method === v} onChange={() => setMethod(v)} className="accent-primary" />
                    {label}
                  </span>
                  <span className="text-sm">{price}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <section>
            <h2 className="mb-3 text-2xl">Payment</h2>
            <div className="rounded-md border border-dashed p-5 text-sm text-muted-foreground">Payment provider not connected yet — this demo does not collect card details.</div>
          </section>
        </div>
        <aside className="h-fit rounded-lg bg-card p-6 shadow-soft">
          <h2 className="mb-4 text-xl">Order summary</h2>
          <ul className="divide-y text-sm">
            {lines.map((l) => (
              <li key={l.key} className="flex items-center gap-3 py-3">
                <img src={l.product.images[0]} alt="" className="h-12 w-12 rounded object-cover" />
                <span className="flex-1">{l.product.name}{l.variant && ` · ${l.variant}`} × {l.qty}</span>
                <span>{formatZAR(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatZAR(totals.subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{totals.shipping === 0 ? "Free" : formatZAR(totals.shipping)}</span></div>
            <div className="flex justify-between pt-2 text-base font-medium"><span>Total</span><span>{formatZAR(totals.total)}</span></div>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
            {submitting ? "Placing order…" : "Place demo order"}
          </Button>
        </aside>
      </form>
    </div>
  );
}
