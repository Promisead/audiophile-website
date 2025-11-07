import { notFound } from "next/navigation";
import ProductDetail from "@/components/layout/ProductDetail";
import { getProductBySlug, getAllProducts } from "@/lib/utils";

// Generate static params for all products
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | Audiophile`,
    description: product.description,
  };
}

// Page component to display the product details
export default async function EarphoneProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // 👈 unwrap it
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
