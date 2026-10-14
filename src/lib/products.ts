import hero from "@/assets/hero.jpg";
import home from "@/assets/home.jpg";
import care from "@/assets/care.jpg";
import lifestyle from "@/assets/lifestyle.jpg";
import sustainable from "@/assets/sustainable.jpg";
import candle from "@/assets/candle.jpg";
import shampoo from "@/assets/shampoo.jpg";
import mug from "@/assets/mug.jpg";

export type CategoryId = "home-essentials" | "personal-care" | "lifestyle" | "sustainable-living";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // ZAR
  short: string;
  description: string;
  images: string[];
  specs: Record<string, string>;
  variants?: string[];
  stock: number; // demo stock
  popularity: number;
  addedAt: string; // ISO date, used for "newest"
  bestSeller?: boolean;
}

export const categories: Category[] = [
  { id: "home-essentials", name: "Home Essentials", blurb: "Calm, useful pieces for every room.", image: home },
  { id: "personal-care", name: "Personal Care", blurb: "Gentle daily rituals.", image: care },
  { id: "lifestyle", name: "Lifestyle", blurb: "Made to go wherever you go.", image: lifestyle },
  { id: "sustainable-living", name: "Sustainable Living", blurb: "Reusable swaps for less waste.", image: sustainable },
];

export const heroImage = hero;

export const products: Product[] = [
  {
    id: "steel-water-bottle", name: "Stainless-Steel Water Bottle", category: "lifestyle", price: 349,
    short: "Double-walled, keeps drinks cold or hot.",
    description: "A reusable bottle with a brushed steel cap and a soft matte finish. Double-walled to help keep drinks at temperature through the day.",
    images: [lifestyle, hero], specs: { Capacity: "750 ml", Material: "Stainless steel", Care: "Hand wash" },
    variants: ["Forest", "Sage", "Sand"], stock: 24, popularity: 98, addedAt: "2026-08-02", bestSeller: true,
  },
  {
    id: "bamboo-toothbrush-set", name: "Bamboo Toothbrush Set", category: "personal-care", price: 129,
    short: "Set of four with soft bristles.",
    description: "Four toothbrushes with bamboo handles and soft bristles, packed in a paper box.",
    images: [care, hero], specs: { Quantity: "4 brushes", Handle: "Bamboo", Bristles: "Soft" },
    stock: 60, popularity: 92, addedAt: "2026-06-11", bestSeller: true,
  },
  {
    id: "soy-candle", name: "Natural Soy Candle", category: "home-essentials", price: 279,
    short: "Lavender and chamomile, hand poured.",
    description: "A soy wax candle in a reusable glass jar with a calm lavender and chamomile scent.",
    images: [candle, hero], specs: { Weight: "220 g", Wax: "Soy", Scent: "Lavender & chamomile" },
    variants: ["Lavender", "Cedar", "Unscented"], stock: 18, popularity: 95, addedAt: "2026-09-20", bestSeller: true,
  },
  {
    id: "reusable-shopping-bag", name: "Reusable Shopping Bag", category: "sustainable-living", price: 149,
    short: "Sturdy jute bag for weekly shopping.",
    description: "A roomy jute bag with cotton handles, built for the weekly market run.",
    images: [sustainable], specs: { Material: "Jute, cotton handles", Size: "40 × 35 × 15 cm" },
    stock: 40, popularity: 80, addedAt: "2026-05-04",
  },
  {
    id: "glass-storage-jars", name: "Glass Storage Jars", category: "home-essentials", price: 399,
    short: "Set of two with wooden lids.",
    description: "Clear glass jars with wooden lids for grains, pasta, and pantry staples.",
    images: [home], specs: { Quantity: "2 jars", Capacity: "1 L & 1.5 L", Lid: "Wood" },
    stock: 12, popularity: 85, addedAt: "2026-07-15", bestSeller: true,
  },
  {
    id: "organic-cotton-tote", name: "Organic Cotton Tote Bag", category: "lifestyle", price: 199,
    short: "Everyday tote in natural cotton.",
    description: "A simple tote in natural cotton canvas, light enough to fold into any bag.",
    images: [lifestyle], specs: { Material: "Cotton canvas", Size: "38 × 42 cm" },
    stock: 35, popularity: 78, addedAt: "2026-04-22",
  },
  {
    id: "natural-hand-wash", name: "Natural Hand Wash", category: "personal-care", price: 189,
    short: "Aloe and essential oils, amber glass bottle.",
    description: "A gentle hand wash with aloe vera, in a refillable amber glass pump bottle.",
    images: [care], specs: { Volume: "500 ml", Bottle: "Amber glass, refillable" },
    stock: 30, popularity: 88, addedAt: "2026-09-01",
  },
  {
    id: "body-lotion", name: "Body Lotion", category: "personal-care", price: 229,
    short: "Shea butter lotion for daily use.",
    description: "A light, everyday lotion with shea butter, in an amber glass pump bottle.",
    images: [care], specs: { Volume: "500 ml", Bottle: "Amber glass" },
    stock: 0, popularity: 74, addedAt: "2026-03-18",
  },
  {
    id: "botanical-shampoo", name: "Botanical Shampoo", category: "personal-care", price: 249,
    short: "Rosemary-scented, refillable bottle.",
    description: "A rosemary-scented shampoo for everyday washing, in a refillable glass bottle.",
    images: [shampoo], specs: { Volume: "400 ml", Scent: "Rosemary" },
    stock: 22, popularity: 82, addedAt: "2026-10-01",
  },
  {
    id: "reusable-food-wraps", name: "Reusable Food Wraps", category: "sustainable-living", price: 179,
    short: "Beeswax wraps in three sizes.",
    description: "Washable beeswax wraps for covering bowls and wrapping snacks.",
    images: [sustainable], specs: { Quantity: "3 wraps (S, M, L)", Care: "Rinse in cool water" },
    stock: 45, popularity: 90, addedAt: "2026-08-28", bestSeller: true,
  },
  {
    id: "ceramic-coffee-mug", name: "Ceramic Coffee Mug", category: "home-essentials", price: 219,
    short: "Speckled stoneware, sage dipped base.",
    description: "A handmade-style stoneware mug with a speckled glaze and a sage-dipped base.",
    images: [mug], specs: { Capacity: "350 ml", Material: "Stoneware", Care: "Dishwasher safe" },
    stock: 16, popularity: 86, addedAt: "2026-09-12",
  },
  {
    id: "home-diffuser", name: "Minimalist Home Diffuser", category: "home-essentials", price: 459,
    short: "Ceramic reed diffuser, lavender scent.",
    description: "A matte ceramic diffuser with natural reeds for a soft, lasting scent.",
    images: [candle], specs: { Volume: "120 ml", Vessel: "Ceramic", Reeds: "8 natural reeds" },
    variants: ["Lavender", "Cedar"], stock: 9, popularity: 76, addedAt: "2026-10-05",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
