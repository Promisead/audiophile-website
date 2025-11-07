import OrderDetail from "@/components/order";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return <OrderDetail orderId={orderId} />;
}

// ============================================
// Generate static params for deployed orders
// ============================================
export async function generateStaticParams() {
  // This will be empty initially, pages will be generated on-demand
  return [];
}

// ============================================
// Generate metadata
// ============================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return {
    title: `Order ${orderId} | Audiophile`,
    description: "View your order details and shipping information",
  };
}
