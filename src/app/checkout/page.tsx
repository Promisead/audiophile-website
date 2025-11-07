import Checkout from "@/components/checkout";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Checkout | Audiophile",
  description: "Checkout your order and receive a shipping confirmation email.",
};

const CheckoutPage: NextPage = () => <Checkout />;

export default CheckoutPage;
