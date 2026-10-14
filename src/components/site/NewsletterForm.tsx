import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const schema = z.string().trim().email("Please enter a valid email address").max(255);

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const id = compact ? "nl-footer" : "nl-main";

  if (done) return <p className="text-sm" role="status">Thank you — you're on the list.</p>;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const r = schema.safeParse(email);
        if (!r.success) return setError(r.error.issues[0].message);
        setError(null);
        setDone(true);
        toast.success("Subscribed", { description: "Demo signup — no email is sent yet." });
      }}
      className="w-full"
    >
      <div className={`flex gap-2 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
        <label htmlFor={id} className="sr-only">Email address</label>
        <input id={id} type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
          placeholder="Your email address"
          className="h-11 flex-1 rounded-md border bg-card px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
        <Button type="submit" className="h-11 px-6">Subscribe</Button>
      </div>
      {error && <p id={`${id}-err`} className="mt-2 text-sm text-destructive">{error}</p>}
      {!compact && (
        <p className="mt-3 text-xs text-muted-foreground">We respect your privacy. Unsubscribe anytime.</p>
      )}
    </form>
  );
}
