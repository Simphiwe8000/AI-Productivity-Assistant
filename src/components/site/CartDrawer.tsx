import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { calcTotals, formatZAR, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";

export function QtyStepper({ value, onChange, max }: { value: number; onChange: (n: number) => void; max: number }) {
  return (
    <div className="inline-flex items-center rounded-md border">
      <button aria-label="Decrease quantity" className="p-2 disabled:opacity-40" disabled={value <= 1} onClick={() => onChange(value - 1)}>
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm" aria-live="polite">{value}</span>
      <button aria-label="Increase quantity" className="p-2 disabled:opacity-40" disabled={value >= max} onClick={() => onChange(value + 1)}>
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { lines, open, setOpen, update, remove } = useCart();
  const { subtotal, shipping, total } = calcTotals(lines.map((l) => ({ price: l.product.price, qty: l.qty })));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl">Your Cart</SheetTitle>
        </SheetHeader>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-10 w-10 text-sage" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button asChild onClick={() => setOpen(false)}><Link to="/shop">Start shopping</Link></Button>
          </div>
        ) : (
          <>
            <ul className="-mx-6 flex-1 divide-y overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 py-4">
                  <img src={l.product.images[0]} alt="" className="h-20 w-20 rounded-md object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-medium leading-tight">{l.product.name}</p>
                        {l.variant && <p className="text-xs text-muted-foreground">{l.variant}</p>}
                      </div>
                      <button aria-label={`Remove ${l.product.name}`} onClick={() => remove(l.key)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QtyStepper value={l.qty} max={l.product.stock} onChange={(n) => update(l.key, n)} />
                      <span className="text-sm font-medium">{formatZAR(l.product.price * l.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatZAR(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping estimate</span><span>{shipping === 0 ? "Free" : formatZAR(shipping)}</span></div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">Free standard shipping on orders over {formatZAR(FREE_SHIPPING_THRESHOLD)}.</p>
              )}
              <div className="flex justify-between pt-2 text-base font-medium"><span>Total</span><span>{formatZAR(total)}</span></div>
              <div className="grid gap-2 pt-3">
                <Button asChild size="lg" onClick={() => setOpen(false)}><Link to="/checkout">Proceed to Checkout</Link></Button>
                <Button variant="outline" size="lg" onClick={() => setOpen(false)}>Continue Shopping</Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
