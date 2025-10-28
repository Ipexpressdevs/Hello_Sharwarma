# Project Roadmap

This document outlines the future development plans for the Hello Shawarma platform, categorized into short-term, mid-term, and long-term goals.

---

### Phase 1: Short-Term Goals (Core Functionality)

These are the next immediate steps to make the prototype a more complete and functional application.

- **Vendor - Functional Cart & Checkout**:
  - Implement "Add to Cart" functionality on the Product Catalog page.
  - Create a shopping cart page to review and modify quantities.
  - Build a checkout flow that creates a new order and deducts the total from the vendor's wallet.

- **Admin - Full CRUD Operations**:
  - **Product Management**: Implement functionality to Create, Read, Update, and Delete products from the catalog.
  - **Vendor Management**: Build an interface to view all registered vendors, approve new signups, and manage their details.

- **Notifications**:
  - Implement a simple in-app notification system (e.g., a bell icon in the header) to alert users of important events (e.g., Rider gets a new job, Vendor's order is delivered).

---

### Phase 2: Mid-Term Goals (Backend & Real-Time Features)

This phase focuses on replacing the mock data with a real backend and introducing more dynamic features.

- **Backend Integration**:
  - Choose and integrate a backend service (e.g., Firebase, Supabase, or a custom Node.js/Express API).
  - Migrate all mock data to a persistent database.
  - Refactor data fetching and updates to use API calls instead of local state.

- **Authentication & Authorization**:
  - Implement a secure user authentication system (email/password, social logins).
  - Secure API endpoints based on user roles.

- **Real-Time Delivery Tracking**:
  - For Riders, integrate a geolocation API (e.g., Google Maps API) to track their location.
  - For Vendors and Admins, display the rider's location on a live map for orders in transit.

- **Payment Gateway Integration**:
  - Integrate a real payment provider like Paystack or Stripe to allow vendors to top up their wallets.

---

### Phase 3: Long-Term Vision (Advanced Features & Scaling)

This phase includes features that would turn the platform into a mature, market-ready product.

- **Advanced Inventory Management**:
  - Admins can track stock levels with precision.
  - Automatic low-stock alerts for admins.
  - Vendors can see real-time stock availability in the catalog.

- **Subscription & Recurring Orders**:
  - Allow vendors to set up recurring weekly or bi-weekly orders for essential items, fully automating their re-stocking process.

- **Advanced Analytics & Reporting**:
  - **For Admins**: Deeper insights into platform performance, vendor purchasing habits, and regional sales data.
  - **For Vendors**: A personal dashboard showing their spending habits, most ordered products, and suggestions for optimizing their purchases.

- **Dedicated Mobile App**:
  - Develop a native mobile application, especially for Riders, with push notifications and optimized route planning.

- **Multi-Warehouse Support**:
  - Allow the platform to manage inventory and logistics across multiple physical warehouses.
