// Demo shipping rules: free over the threshold, otherwise a flat fee.
export const FREE_SHIPPING_THRESHOLD = 750;
export const STANDARD_SHIPPING = 85;
export const EXPRESS_SHIPPING = 150;

export type DeliveryMethod = "standard" | "express";

export function formatZAR(amount: number) {
  return `R ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function calcTotals(
  items: { price: number; qty: number }[],
  method: DeliveryMethod = "standard",
) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  let shipping = 0;
  if (subtotal > 0) {
    if (method === "express") shipping = EXPRESS_SHIPPING;
    else shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  }
  return { subtotal, shipping, total: subtotal + shipping };
}
