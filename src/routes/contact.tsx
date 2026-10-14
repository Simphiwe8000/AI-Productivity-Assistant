import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Everyday Essentials" },
      { name: "description", content: "Get in touch with the Everyday Essentials team." },
      { property: "og:title", content: "Contact Everyday Essentials" },
      { property: "og:description", content: "Questions about an order or product? We're here to help." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(1, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});
type F = z.infer<typeof schema>;

function Contact() {
  const [v, setV] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof F, string>>>({});
  const [sent, setSent] = useState(false);
  const input = "w-full rounded-md border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring aria-[invalid=true]:border-destructive";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(v);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof F] = i.message));
      return setErrors(errs);
    }
    setErrors({});
    setSent(true);
    toast.success("Message received", { description: "Demo form — messages aren't delivered yet." });
  };

  const Field = ({ name, label, area }: { name: keyof F; label: string; area?: boolean }) => (
    <div>
      <label htmlFor={`c-${name}`} className="mb-1.5 block text-sm">{label}</label>
      {area ? (
        <textarea id={`c-${name}`} rows={6} className={input} value={v[name] ?? ""} aria-invalid={!!errors[name]}
          onChange={(e) => setV((s) => ({ ...s, [name]: e.target.value }))} />
      ) : (
        <input id={`c-${name}`} className={input} value={v[name] ?? ""} aria-invalid={!!errors[name]}
          type={name === "email" ? "email" : "text"} onChange={(e) => setV((s) => ({ ...s, [name]: e.target.value }))} />
      )}
      {errors[name] && <p className="mt-1 text-xs text-destructive">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <PageHeader eyebrow="Say hello" title="Contact Us" intro="Questions about an order, a product or a return? Send us a note." />
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1fr_320px]">
        {sent ? (
          <div className="rounded-lg bg-card p-10 shadow-soft" role="status">
            <h2 className="text-2xl text-primary">Thank you!</h2>
            <p className="mt-2 text-muted-foreground">We've received your message and will reply soon.</p>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">{Field({ name: "name", label: "Name" })}{Field({ name: "email", label: "Email" })}</div>
            {Field({ name: "subject", label: "Subject" })}
            {Field({ name: "message", label: "Message", area: true })}
            <Button type="submit" size="lg">Send message</Button>
          </form>
        )}
        <aside className="space-y-5 text-sm">
          <p className="flex gap-3"><Mail className="h-5 w-5 text-sage" /> hello@example.com</p>
          <p className="flex gap-3"><Phone className="h-5 w-5 text-sage" /> +27 00 000 0000</p>
          <p className="flex gap-3"><MapPin className="h-5 w-5 text-sage" /> Address to be confirmed</p>
          <p className="text-xs text-muted-foreground">Placeholder contact details.</p>
        </aside>
      </div>
    </>
  );
}
