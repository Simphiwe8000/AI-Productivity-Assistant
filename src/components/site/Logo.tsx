import { Link } from "@tanstack/react-router";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 11h20l-1.5 16.5a1.5 1.5 0 0 1-1.5 1.5H9a1.5 1.5 0 0 1-1.5-1.5L6 11Z" />
      <path d="M11.5 11V8.5a4.5 4.5 0 0 1 9 0V11" />
      <path d="M16 25c-3.5-1.5-4.5-5-3-8.5 2.5.2 5 1.8 5.5 4.8M16 25c0-3 1-5 3.5-6.5" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-primary" aria-label="Everyday Essentials home">
      <LogoMark />
      <span className="font-serif text-lg leading-none md:text-xl">Everyday Essentials</span>
    </Link>
  );
}
