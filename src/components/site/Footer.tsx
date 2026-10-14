import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { LogoMark } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { categories } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-serif text-xl">Everyday Essentials</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/75">
            Quality products for a better you — thoughtfully selected essentials for home, body and lifestyle.
          </p>
          <div className="mt-6 max-w-sm"><NewsletterForm compact /></div>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-medium">Shop</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/shop">All products</Link></li>
            {categories.map((c) => (
              <li key={c.id}><Link to="/shop" search={{ category: c.id }}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-medium">Support</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/contact">Customer support</Link></li>
            <li><Link to="/shipping">Shipping & returns</Link></li>
            <li><Link to="/about">About us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-medium">Legal</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/privacy">Privacy policy</Link></li>
            <li><Link to="/terms">Terms & conditions</Link></li>
          </ul>
          <div className="mt-6 flex gap-4">
            <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-6 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Everyday Essentials. Demo store — products, prices and stock are samples.
      </div>
    </footer>
  );
}
