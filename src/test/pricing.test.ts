import { describe, it, expect } from "vitest";
import { calcTotals, formatZAR } from "@/lib/pricing";

describe("pricing", () => {
  it("formats rand as R 199.00", () => {
    expect(formatZAR(199)).toBe("R 199.00");
  });
  it("charges standard shipping under R750", () => {
    expect(calcTotals([{ price: 199, qty: 2 }])).toEqual({ subtotal: 398, shipping: 85, total: 483 });
  });
  it("gives free standard shipping from R750", () => {
    expect(calcTotals([{ price: 375, qty: 2 }]).shipping).toBe(0);
  });
  it("empty cart has no shipping", () => {
    expect(calcTotals([]).total).toBe(0);
  });
});
