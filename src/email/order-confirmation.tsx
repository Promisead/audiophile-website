import { formatPrice } from "@/lib/utils";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Row,
  Column,
} from "@react-email/components";

interface OrderConfirmationEmailProps {
  orderId: string;
  customerName: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totals: {
    subtotal: number;
    shipping: number;
    vat: number;
    grandTotal: number;
  };
}

export function OrderConfirmationEmail({
  orderId,
  customerName,
  items,
  totals,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Audiophile order has been confirmed - {orderId}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>audiophile</Heading>
          </Section>

          {/* Success Message */}
          <Section style={content}>
            <Heading style={heading}>Thank You for Your Order!</Heading>
            <Text style={paragraph}>Hi {customerName},</Text>
            <Text style={paragraph}>
              Your order has been confirmed and will be shipped soon. {"We'll"}{" "}
              send you another email when your order ships.
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={orderBox}>
            <Text style={orderIdText}>Order ID: {orderId}</Text>

            <Hr style={hr} />

            {/* Items */}
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column>
                  <Text style={itemName}>
                    {item.name} x{item.quantity}
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={itemPrice}>
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={hr} />

            {/* Totals */}
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Subtotal</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>{formatPrice(totals.subtotal)}</Text>
              </Column>
            </Row>

            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Shipping</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>${totals.shipping}</Text>
              </Column>
            </Row>

            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>VAT (Included)</Text>
              </Column>
              <Column align="right">
                <Text style={totalValue}>{formatPrice(totals.vat)}</Text>
              </Column>
            </Row>

            <Hr style={hr} />

            <Row style={grandTotalRow}>
              <Column>
                <Text style={grandTotalLabel}>Grand Total</Text>
              </Column>
              <Column align="right">
                <Text style={grandTotalValue}>
                  {formatPrice(totals.grandTotal)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* CTA Button */}
          <Section style={buttonSection}>
            <Button
              style={button}
              href={`${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}`}
            >
              View Your Order
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Need help? Contact us at{" "}
              <a style={a} href="mailto:hello@unbuilt.studio">
                hello@unbuilt.studio
              </a>
            </Text>
            <Text style={footerText}>
              Located at the heart of Abuja, Audiophile is the premier store for
              high end headphones, earphones, speakers, and audio accessories.
            </Text>
            <Hr style={hr} />
            <Text style={footerText}>
              © {new Date().getFullYear()} Audiophile. All Rights Reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Email Styles
const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#191919",
  padding: "32px 24px",
  textAlign: "center" as const,
};

const logo = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  textTransform: "lowercase" as const,
};

const content = {
  backgroundColor: "#ffffff",
  padding: "32px 24px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#000000",
  margin: "0 0 16px",
  textTransform: "uppercase" as const,
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "25px",
  color: "rgba(0, 0, 0, 0.5)",
  margin: "0 0 16px",
};

const orderBox = {
  backgroundColor: "#ffffff",
  padding: "24px",
  margin: "0",
};

const orderIdText = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#D87D4A",
  margin: "0 0 16px",
  textTransform: "uppercase" as const,
};

const hr = {
  borderColor: "rgba(0, 0, 0, 0.1)",
  margin: "16px 0",
};

const itemRow = {
  marginBottom: "8px",
};

const itemName = {
  fontSize: "15px",
  fontWeight: "500",
  color: "#000000",
  margin: "0",
};

const itemPrice = {
  fontSize: "15px",
  fontWeight: "500",
  color: "#000000",
  margin: "0",
};

const totalRow = {
  marginBottom: "8px",
};

const totalLabel = {
  fontSize: "15px",
  color: "rgba(0, 0, 0, 0.5)",
  margin: "0",
  textTransform: "uppercase" as const,
};

const totalValue = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#000000",
  margin: "0",
};

const grandTotalRow = {
  marginTop: "16px",
};

const grandTotalLabel = {
  fontSize: "15px",
  color: "rgba(0, 0, 0, 0.5)",
  margin: "0",
  textTransform: "uppercase" as const,
};

const grandTotalValue = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#D87D4A",
  margin: "0",
};

const buttonSection = {
  backgroundColor: "#ffffff",
  padding: "0 24px 32px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#D87D4A",
  borderRadius: "0",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "15px 30px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const a = {
  color: "#D87D4A",
  textDecoration: "underline",
};

const footer = {
  backgroundColor: "#ffffff",
  padding: "32px 24px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "13px",
  lineHeight: "22px",
  color: "rgba(0, 0, 0, 0.5)",
  margin: "0 0 16px",
};
