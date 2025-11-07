# Audiophile E-commerce Website

A pixel-perfect, fully functional e-commerce website for premium audio equipment, built with Next.js 16, TypeScript, Tailwind CSS v4, and Convex backend. Features a complete checkout flow with order confirmation emails and real-time cart management.

![Audiophile Homepage](./public/preview.png)

## Live Demo

**[View Live Site](-------------------------------------------------)**

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Key Features Deep Dive](#key-features-deep-dive)
- [Development](#development)
- [Deployment](#deployment)
- [API Routes](#api-routes)
- [Testing](#testing)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality

- **Pixel-Perfect Design**: Faithfully implements the Audiophile Figma design across mobile (375px), tablet (768px), and desktop (1440px) breakpoints
- **Product Catalog**: Browse premium headphones, speakers, and earphones with detailed product pages
- **Smart Shopping Cart**:
  - Real-time cart updates with localStorage persistence
  - Cart badge showing item count
  - Inline quantity adjustments
  - Smart "Added to Cart" state management
  - Remove all items functionality
- **Responsive Navigation**:
  - Mobile-friendly hamburger menu with category cards
  - Active link highlighting
  - Smooth slide-down animations
  - Body scroll lock when menu open
- **Product Gallery**: High-quality product images with Next.js Image optimization

### Enhanced Shopping Experience

- **Smart Add to Cart**:
  - Button transforms to "View Cart" + "Added" when product is in cart
  - Real-time quantity updates sync with cart
  - Visual feedback with toast notifications
- **Cart Synchronization**: Cart state syncs across all components in real-time
- **Persistent Cart**: Cart data saved to localStorage, survives page reloads

### Checkout Experience

- **Multi-Step Form Validation**:
  - Billing details (name, email, phone)
  - Shipping information (address, ZIP, city, country)
  - Payment method selection (e-Money or Cash on Delivery)
  - Real-time inline validation with Zod
  - Accessible error messages
- **Edge Case Handling**:
  - Invalid email format detection
  - Phone number validation (international format)
  - Required field enforcement
  - ZIP code format validation
  - Duplicate submission prevention
  - Empty cart protection
- **Order Confirmation**:
  - Orders saved to Convex database with full details
  - Automated confirmation email with responsive HTML template
  - Order details page with tracking
  - Unique order ID generation
  - Purchase breakdown (subtotal, shipping, VAT, grand total)

### Email System

- **Responsive HTML Email Template**:
  - Personalized greeting with customer name
  - Unique order ID for tracking
  - Complete order summary with product details
  - Shipping information
  - Order totals breakdown
  - "View Order" CTA button linking to order details page
  - Support contact information
  - Mobile-responsive design using React Email

### Backend & Data Management

- **Convex Integration**:
  - Real-time order storage
  - Structured data schema for orders
  - Query orders by ID or email
  - Order status tracking
  - Automatic timestamp generation
- **Order Data Structure**:

  ```typescript
  {
    orderId: string,
    customerDetails: { name, email, phone },
    shippingDetails: { address, zipCode, city, country },
    items: [{ productId, slug, name, shortName, price, quantity, image }],
    totals: { subtotal, shipping, vat, grandTotal },
    paymentMethod: "e-money" | "cash",
    eMoneyDetails: { number, pin } (optional),
    status: "confirmed" | "shipped" | "delivered",
    _creationTime: timestamp
  }
  ```

### Order Management

- **Order Details Page**:
  - View complete order information
  - Customer and shipping details
  - Payment method display
  - Order status with color-coded badges
  - Print order functionality
  - Accessible from email links

### User Experience

- **Loading States**: Loading indicators during data fetching
- **Error Handling**: User-friendly error messages for all failure scenarios
- **Smooth Animations**: Framer Motion animations for page transitions and interactions
- **Optimistic UI Updates**: Instant feedback for user actions
- **Toast Notifications**: Real-time feedback using Sonner

### Accessibility

- **WCAG 2.1 AA Compliant**:
  - Semantic HTML5 elements
  - ARIA labels and live regions
  - Keyboard navigation support (Tab, Enter, Escape)
  - Focus visible styles
  - Screen reader announcements for cart updates
  - Form validation with clear error messages
  - Sufficient color contrast (minimum 4.5:1)
  - Skip to content link
  - Descriptive alt text for images
  - Accessible modals with focus trapping

## Tech Stack

### Frontend

- **[Next.js](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS-based configuration with custom utilities
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Hook Form](https://react-hook-form.com/)** - Form state management
- **[Zod](https://zod.dev/)** - Schema validation
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### Backend & Services

- **[Convex](https://convex.dev/)** - Real-time backend database
- **[Resend](https://resend.com/)** - Transactional email service
- **[React Email](https://react.email/)** - Email template components

### Development Tools

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting with Tailwind plugin
- **[Sharp](https://sharp.pixelplumbing.com/)** - Image optimization

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git https://github.com/Promisead/audiophile-website.git
   cd audiophile-ecommerce
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up Convex**

   ```bash
   pnpm convex dev
   ```

   - This will open your browser to create/link a Convex project
   - Follow the prompts to set up your backend
   - Convex will automatically add `NEXT_PUBLIC_CONVEX_URL` to `.env.local`

4. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Convex (automatically added by convex dev)
   CONVEX_DEPLOYMENT=your-deployment-name
   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

   # Resend API Key (get from https://resend.com/api-keys)
   RESEND_API_KEY=re_xxxxxxxxxxxx

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:1313

   # Email
   EMAIL_FROM=your-email@example.com
   ```

5. **Get your Resend API Key**
   - Sign up at [resend.com](https://resend.com)
   - Navigate to API Keys in your dashboard
   - Create a new API key
   - Add it to `.env.local`

6. **Run the development server**

   Open two terminal windows:

   **Terminal 1 - Convex Backend:**

   ```bash
   pnpm convex dev
   ```

   **Terminal 2 - Next.js Frontend:**

   ```bash
   pnpm dev
   ```

7. **Open the application**

   Navigate to [http://localhost:1313](http://localhost:1313)

### Quick Setup (One Command)

After cloning the repo and configuring `.env.local`:

```bash
pnpm install && pnpm convex dev
```

Then in a new terminal:

```bash
pnpm dev
```

## Project Structure

```bash
audiophile-ecommerce/
├── convex/                      # Convex backend
│   ├── _generated/              # Auto-generated Convex files
│   ├── schema.ts                # Database schema
│   ├── orders.ts                # Order mutations and queries
│   ├── tsconfig.json            # Configuration file
│   └── README.md
├── public/                      # Static assets
│   ├── preview.png              # Preview image
│   └── assets/                  # Product images and icons
│       ├── cart/
│       ├── checkout/
│       ├── home/
│       ├── product-xx59-headphones/
│       ├── product-xx99-mark-one-headphones/
│       ├── product-xx99-mark-two-headphones/
│       ├── product-yx1-earphones/
│       ├── product-zx7-speaker/
│       ├── product-zx9-speaker/
│       ├── shared/
│       ├── carts.svg
│       ├── db.json
│       ├── favicon-32x32.png
│       ├── hamburger.svg
│       ├── headphone.svg
│       ├── headphones.png
│       ├── logo.svg
│       ├── man.png
│       └── react.svg
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes
│   │   │   └── send-email/      # Email sending endpoint
│   │   ├── checkout/            # Checkout page
│   │   ├── orders/
│   │   │   └── [orderId]/       # Order details page
│   │   ├── headphones/          # Headphones category
│   │   │   └── [slug]/          # Headphones detail pages
│   │   ├── speakers/            # Speakers category
│   │   └── [slug]/              # Speaker detail pages
│   │   ├── earphones/           # Earphones category
│   │   │   └── [slug]/          # Earphone detail pages
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Homepage
│   │   ├── globals.css          # Tailwind v4 configuration
│   │   └── icon.png             # Next.js favicon
│   ├── components/
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.tsx       # Header with cart
│   │   │   ├── Footer.tsx       # Footer
│   │   │   ├── ProductHeader.tsx # Product header component
│   │   │   └── ProductDetail.tsx # Product detail component
│   │   ├── modals/
│   │   │   ├── CartModal.tsx    # Shopping cart modal
│   │   │   └── OrderConfirmationModal.tsx # Order Confirmation modal
│   │   ├── home/                # Homepage components
│   │   │   ├── Hero.tsx
│   │   │   ├── Category.tsx
│   │   │   ├── SpeakerFeature.tsx
│   │   │   ├── index.tsx
│   │   │   └── About.tsx
│   │   ├── checkout/             # Checkout components
│   │   │   └── index.tsx
│   │   ├── earphones/                # Earphones components
│   │   │   ├── index.tsx
│   │   │   └── EarphoneProduct.tsx
│   │   ├── speakers/                # Earphones components
│   │   │   ├── index.tsx
│   │   │   └── SpeakersProduct.tsx
│   │   ├── order/                # Earphones components
│   │   │   └── index.tsx
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Select.tsx
│   │   │   └── NumberInput.tsx
│   │   └── providers/           # Context providers
│   │       └── convex-provider.tsx
│   ├── context/
│   │   └── CartContext.tsx      # Global cart state
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts             # Helper functions
│   │   └── validations/         # Zod schemas
│   │       └── checkout.ts
│   ├── @types/                   # TypeScript types
│       ├── css.d.ts
│   │   └── index.d.ts
│   ├── data/                    # Static data
│   │   └── products.ts          # Product catalog
│   ├── emails/                  # Email templates
│   │   └── order-confirmation.tsx
│   └── hooks/                   # Custom React hooks
├── .env.local                   # Environment variables (not committed)
├── .gitignore
├── next.config.js
├── postcss.config.mjs           # PostCSS for Tailwind v4
├── tsconfig.json
├── package.json
└── README.md
```

## Environment Variables

Create a `.env.local` file with the following variables:

| Variable                 | Description                      | Required | Example                                                         |
| ------------------------ | -------------------------------- | -------- | --------------------------------------------------------------- |
| `CONVEX_DEPLOYMENT`      | Convex deployment name           | Yes      | `prod:your-deployment`                                          |
| `NEXT_PUBLIC_CONVEX_URL` | Convex API URL                   | Yes      | `https://your-project.convex.cloud`                             |
| `RESEND_API_KEY`         | Resend API key for emails        | Yes      | `re_123456789`                                                  |
| `NEXT_PUBLIC_APP_URL`    | Your app's URL                   | Yes      | `http://localhost:1313` (dev) / `https://yourdomain.com` (prod) |
| `EMAIL_FROM`             | Email address for sending emails | Yes      | `your-email@example.com`                                        |

**Getting API Keys:**

1. **Convex**: Run `pnpm convex dev` - automatically configured
2. **Resend**:
   - Sign up at [resend.com](https://resend.com)
   - Go to API Keys → Create API Key
   - Copy and paste into `.env.local`

## Key Features Deep Dive

### Cart System Architecture

The cart system uses React Context for global state management with localStorage persistence:

```typescript
// Cart operations available globally
const {
  items, // Current cart items
  addItem, // Add product to cart
  removeItem, // Remove product from cart
  updateQuantity, // Update item quantity
  clearCart, // Clear entire cart
  totalItems, // Total number of items
  subtotal, // Cart subtotal
  shipping, // Shipping cost ($50)
  vat, // VAT (20% of subtotal)
  grandTotal, // Final total
} = useCart();
```

### Smart Product Page UX

The product detail page features intelligent cart state management:

1. **Not in Cart**: Shows quantity selector + "Add to Cart" button
2. **Added to Cart**: Transforms to show:
   - Quantity selector (updates cart in real-time)
   - "View Cart" button
   - "✓ Added" success indicator
   - Status message showing quantity in cart

This is achieved using **derived state** instead of useEffect, preventing cascading renders:

```typescript
const cartItem = items.find((item) => item.id === product.id);
const isAdded = !!cartItem;
const quantity = isAdded ? cartItem.quantity : localQuantity;
```

### Checkout Flow

1. User adds items to cart
2. Views cart in modal
3. Proceeds to checkout
4. Fills form with real-time validation
5. Submits order
6. Order saved to Convex
7. Email sent via Resend API
8. Confirmation modal shown
9. Cart cleared automatically
10. Can view order details anytime

## Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Start Convex backend
pnpm convex dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Deploy Convex backend
pnpm convex deploy
```

### Code Quality

This project uses:

- **ESLint** for code linting
- **Prettier** with Tailwind plugin for consistent formatting
- **TypeScript** for type safety
- **Conventional commits** for clear git history

### Adding New Products

Edit `src/data/products.ts` to add or modify products:

```typescript
{
  id: 7,
  slug: "product-slug",
  name: "Product Name",
  category: "headphones",
  price: 2999,
  new: true,
  image: {
    mobile: "/assets/product-slug/mobile/image-product.jpg",
    tablet: "/assets/product-slug/tablet/image-product.jpg",
    desktop: "/assets/product-slug/desktop/image-product.jpg"
  },
  // ... additional fields
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy Convex backend**

   ```bash
   pnpm convex deploy
   ```

   This generates a production Convex URL.

3. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables:
     - `CONVEX_DEPLOYMENT`
     - `NEXT_PUBLIC_CONVEX_URL` (production URL from step 2)
     - `RESEND_API_KEY`
     - `NEXT_PUBLIC_APP_URL` (your Vercel domain)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

### Post-Deployment Checklist

- [x] Verify all environment variables are set correctly
- [x] Test checkout flow end-to-end
- [x] Confirm order confirmation emails are delivered
- [x] Check responsive design on multiple devices
- [x] Test navigation and cart functionality
- [x] Verify Convex backend is accessible
- [x] Check console for any errors
- [x] Test accessibility with screen reader
- [x] Run Lighthouse audit (aim for 90+ scores)

## API Routes

### POST `/api/send-email`

Sends order confirmation email using Resend.

**Request Body:**

```json
{
  "orderId": "ORD-ABC123",
  "customerDetails": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "items": [...],
  "totals": {...}
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "email-id"
  }
}
```

## Testing

### Manual Testing Checklist

**Cart Functionality:**

- [x] Add product to cart
- [x] Update quantity in cart modal
- [x] Remove item from cart
- [x] Remove all items
- [x] Cart persists on page reload
- [x] Cart badge shows correct count

**Checkout Flow:**

- [x] Form validation works
- [x] All error states display correctly
- [x] Empty cart redirects to home
- [x] Order saves to Convex
- [x] Email is sent
- [x] Confirmation modal shows
- [x] Cart clears after order

**Navigation:**

- [x] Mobile menu opens/closes
- [x] Active links highlighted
- [x] All links work correctly
- [x] Logo returns to home

**Product Pages:**

- [x] Images load correctly
- [x] Add to cart updates state
- [x] "Added" state displays
- [x] Related products work
- [x] Gallery displays properly

### Test Data

Use this test data for checkout:

```bash
Name: Alex Ward
Email: test@example.com
Phone: +1234567890
Address: 123 Main Street
ZIP Code: 12345
City: New York
Country: United States

e-Money Number: 238521993
e-Money PIN: 6891
```

## Design System

### Tailwind v4 Configuration

This project uses Tailwind CSS v4 with CSS-based configuration in `globals.css`:

**Color Palette:**

- Primary: `#D87D4A` (Orange)
- Primary Hover: `#FBAF85`
- Black: `#000000`
- White: `#FFFFFF`
- Gray shades: `#F1F1F1`, `#CFCFCF`, `#979797`

**Typography:**

- Font: Manrope (Google Fonts)
- Custom utility classes: `h1-desktop`, `h2-mobile`, `body`, `overline`, `subtitle`

**Breakpoints:**

- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

### Custom Utilities

```css
/* Typography */
.h1-desktop {
  /* 56px, 58px line-height */
}
.h2-mobile {
  /* 28px, 32px line-height */
}
.body {
  /* 15px, 25px line-height */
}
.overline {
  /* 14px, uppercase, 10px letter-spacing */
}

/* Layout */
.container-responsive {
  /* Responsive padding */
}
```

## Accessibility Guidelines

This project follows **WCAG 2.1 AA** guidelines:

### Accessibility Features

- ✅ Semantic HTML5 elements
- ✅ ARIA labels for interactive elements
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus visible styles
- ✅ Screen reader announcements for cart updates
- ✅ Form validation with clear error messages
- ✅ Sufficient color contrast (minimum 4.5:1)
- ✅ Skip to content link
- ✅ Descriptive alt text for images
- ✅ Accessible modals with focus trapping
- ✅ Loading states announced to screen readers

## Performance

### Optimizations Implemented

1. **Image Optimization**
   - Next.js Image component with automatic WebP conversion
   - Responsive images for different screen sizes
   - Lazy loading below the fold

2. **Code Splitting**
   - Automatic code splitting with Next.js App Router
   - Dynamic imports for heavy components

3. **Caching Strategy**
   - Static generation for product pages
   - localStorage for cart persistence
   - Convex real-time subscriptions

4. **Bundle Size**
   - pnpm for efficient package management
   - Minimal dependencies

## Email Template

The confirmation email includes:

- Personalized greeting
- Order ID and date
- Itemized order summary
- Shipping details
- Order totals
- "View Order" button
- Support contact info
- Responsive HTML/CSS design

**Tech Stack:**

- React Email for component-based templates
- Resend for email delivery
- Inline CSS for maximum compatibility

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test thoroughly before submitting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built as part of HNG Frontend Stage 3 challenge
- Design inspiration from [Figma](https://www.figma.com/design/jfDxXzGw2lfyJOgFGbJOW4/audiophile-ecommerce-website?node-id=0-8390&t=MOnnlBKewWIGCbpx-0)
- Fonts from [Google Fonts](https://fonts.google.com)
- Icons from [Lucide React](https://lucide.dev)

## Project Status

**Status:** ✅ Production Ready

**Completed Features:**

- [x] Product browsing and details
- [x] Shopping cart with persistence
- [x] Checkout with validation
- [x] Order confirmation emails
- [x] Order details page
- [x] Responsive design
- [x] Accessibility compliance
- [x] Performance optimization

**Future Enhancements:**

- [x] User authentication
- [x] Order history for users
- [x] Product reviews and ratings
- [x] Wishlist functionality
- [x] Payment integration (Stripe)
- [x] Admin dashboard
- [x] Real-time order tracking
- [x] Multi-language support

---

## Author

### PROMISE CHAMPION

- GitHub: [@Promisead](https://github.com/Promisead)
- Twitter: [@Promisead](https://x.com/Promisedukeac)
- LinkedIn: [@Promise Champion](https://www.linkedin.com/in/promise-champion-a0020656/)

[⬆ Back to top](#audiophile-e-commerce-website)
