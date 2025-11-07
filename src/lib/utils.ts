import { products } from "@/data/products";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 * @param inputs Class names to be combined
 * @returns string containing all class names
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price number into a formatted string.
 * @param price number
 * @returns string formatted price
 */

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Retrieves a product by its slug.
 * @param slug product slug
 * @returns Product object or undefined if not found
 */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/**
 * Retrieves products by category.
 * @param category product category
 * @returns Array of Product objects
 */

export function getProductsByCategory(
  category: "earphones" | "headphones" | "speakers"
): Product[] {
  return products.filter((product) => product.category === category);
}

/**
 * Retrieves all products.
 * @returns Array of Product objects
 */

export function getAllProducts(): Product[] {
  return products;
}
