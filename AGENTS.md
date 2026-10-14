<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Product catalogue lives in src/lib/products.ts and pricing/shipping math in src/lib/pricing.ts — single source of truth for shop, cart, checkout and future AI assistant.
- Cart state is a React context persisted to localStorage (src/lib/cart.tsx) — no backend yet.
