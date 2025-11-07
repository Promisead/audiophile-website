interface Product {
  id: number;
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: "earphones" | "headphones" | "speakers";
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: Array<{
    quantity: number;
    item: string;
  }>;
  gallery: {
    first: { mobile: string; tablet: string; desktop: string };
    second: { mobile: string; tablet: string; desktop: string };
    third: { mobile: string; tablet: string; desktop: string };
  };
  others: Array<{
    slug: string;
    name: string;
    image: { mobile: string; tablet: string; desktop: string };
  }>;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  _creationTime: number;
  orderId: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  shippingDetails: {
    address: string;
    zipCode: string;
    city: string;
    country: string;
  };
  items: CartItem[];
  totals: {
    subtotal: number;
    shipping: number;
    vat: number;
    grandTotal: number;
  };
  paymentMethod: "e-money" | "cash";
  status: "pending" | "confirmed" | "shipped" | "delivered";
}
