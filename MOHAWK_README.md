# Mohawk Xchange - B2B Dealer Customer Application

A professional B2B dealer ordering platform built with Angular and Tailwind CSS, designed for flooring product dealers to browse, order, and manage their purchases.

## 🎯 Overview

Mohawk Xchange is a comprehensive B2B e-commerce platform that enables dealers to:
- Browse a catalog of 48+ premium flooring products
- Add products to cart with quantity management
- Complete multi-step checkout process
- Track order history and status
- View detailed product specifications
- Reserve products for future orders

## 🛠️ Tech Stack

**Frontend:**
- Angular 21.1.0 (Standalone Components)
- Tailwind CSS 3.4.17
- TypeScript 5.9.2
- RxJS for state management
- Zone.js for change detection

**Design System:**
- Dark theme with professional B2B aesthetic
- Custom color palette matching Mohawk brand
- HSL color system for consistency
- Inter font family for modern typography
- Responsive mobile-first design

## 🚀 Features

### Dashboard
- **KPI Cards:** Total Orders (847), Total Spend ($284,500), Open Claims (3), Active Quotes (12)
- **Quick Actions:** Browse Products, Quick Order, Submit Claim, Request Quote
- **Spend Analyzer:** 6-month bar chart with AI-powered insights
- **Recent Orders:** Order history preview with status badges

### Product Catalog
- **48 Products:** Across 5 categories (Carpet Tile, Hardwood, Vinyl, Laminate, Ceramic Tile)
- **Advanced Filtering:** Search, Product Type, Availability, Price Range
- **Smart Sorting:** Featured, Price (Low-High, High-Low), Rating
- **Product Details:** Images, SKU, ratings, specifications, stock status
- **Badges:** Best Seller, Trending, New, Limited Stock

### Shopping Cart
- **Quantity Management:** Increment/decrement controls
- **Reserve Feature:** 7-day product reservation
- **Order Summary:** Subtotal, Tax (8%), Total calculation
- **Support Integration:** Quick access to customer service
- **Persistent State:** LocalStorage-based cart persistence

### Checkout
- **4-Step Process:** Shipping Address → Shipping Method → Payment → Review
- **Multiple Shipping Options:** Standard, Express, Next Day
- **Order Summary:** Real-time total calculation
- **Form Validation:** Complete shipping and payment forms

### Order Management
- **Order History:** Comprehensive table view
- **Status Tracking:** In Transit, Processing, Delivered, Cancelled
- **Order Details:** Individual order breakdowns
- **Estimated Arrival:** Delivery date tracking

## 🔧 Running the Application

```bash
# Navigate to frontend directory
cd /app/frontend

# Start development server
yarn start

# Application runs on http://localhost:3000
```

## 📊 Application Structure

- **Dashboard (/)** - KPIs, Quick Actions, Spend Analytics, Recent Orders
- **Products (/products)** - Product catalog with filters and search
- **Product Detail (/product/:id)** - Individual product information
- **Cart (/cart)** - Shopping cart with quantity controls
- **Checkout (/checkout)** - Multi-step checkout process
- **Orders (/orders)** - Order history table
- **Order Detail (/order/:id)** - Individual order details

## 🎨 Design System

The application uses a professional dark theme with:
- **Primary Color:** Mohawk Brand Red (#C4202A)
- **Background:** Deep Charcoal (#121519)
- **Typography:** Inter font family
- **Components:** Custom Tailwind utilities for buttons, cards, badges

## 📈 MVP Status

✅ Complete product catalog with 48 products
✅ Advanced filtering and sorting
✅ Full shopping cart functionality
✅ Multi-step checkout flow
✅ Order management system
✅ Responsive design
✅ Dark theme implementation
✅ Mock data for demonstration

## 🚀 Next Steps for Production

- Backend API integration
- User authentication
- Payment gateway integration
- Real-time inventory management
- Email notifications
- Advanced reporting

---

**Built for Mohawk Industries B2B Excellence**
