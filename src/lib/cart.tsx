import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct, type Product } from "./products";

export interface CartLine {
  key: string;
  productId: string;
  variant?: string;
  qty: number;
}

interface CartCtx {
  lines: (CartLine & { product: Product })[];
  count: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (p: Product, qty?: number, variant?: string) => void;
  update: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "ee-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setRaw(JSON.parse(s));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(raw));
  }, [raw, loaded]);

  const lines = raw
    .map((l) => ({ ...l, product: getProduct(l.productId)! }))
    .filter((l) => l.product);

  const add: CartCtx["add"] = (p, qty = 1, variant) => {
    if (p.stock <= 0) {
      toast.error(`${p.name} is out of stock`);
      return;
    }
    const key = `${p.id}::${variant ?? ""}`;
    setRaw((cur) => {
      const ex = cur.find((l) => l.key === key);
      if (ex) return cur.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, p.stock) } : l));
      return [...cur, { key, productId: p.id, variant, qty: Math.min(qty, p.stock) }];
    });
    toast.success(`Added to cart`, { description: p.name + (variant ? ` · ${variant}` : "") });
  };
  const update = (key: string, qty: number) =>
    setRaw((cur) =>
      cur.map((l) => {
        if (l.key !== key) return l;
        const max = getProduct(l.productId)?.stock ?? 99;
        return { ...l, qty: Math.max(1, Math.min(qty, max)) };
      }),
    );
  const remove = (key: string) => {
    setRaw((cur) => cur.filter((l) => l.key !== key));
    toast("Item removed from cart");
  };

  return (
    <Ctx.Provider
      value={{
        lines,
        count: lines.reduce((s, l) => s + l.qty, 0),
        open,
        setOpen,
        add,
        update,
        remove,
        clear: () => setRaw([]),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
