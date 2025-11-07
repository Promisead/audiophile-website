import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import ToasterProvider from "@/components/providers/toaster-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Audiophile | Premium Audio Equipment",
  description:
    "Experience natural, lifelike audio with our range of premium headphones, speakers, and earphones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-manrope relative antialiased" suppressHydrationWarning>
        <ConvexClientProvider>
          <CartProvider>
            <Navbar />
            <main className="">{children}</main>
            <Footer />
          </CartProvider>
        </ConvexClientProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
