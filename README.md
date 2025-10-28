# Hello Shawarma

**Hello Shawarma** is a modern, web-based B2B ordering and CRM platform designed specifically for shawarma vendors. It serves as a one-stop-shop for vendors to procure all necessary ingredients, condiments, and packaging materials, streamlining their supply chain and business operations.

The platform is built with a role-based architecture, catering to three key user types: Vendors, Administrators, and delivery Riders.

---

## 🚀 Key Features

- **Role-Based Dashboards**: Tailored interfaces for Vendors, Admins, and Riders, showing relevant information and actions.
- **Product Catalog**: Vendors can browse a wide range of products with filtering and bulk discount information.
- **Order Management**: A complete order lifecycle from placement by the vendor, processing and assignment by the admin, to delivery by the rider.
- **Real-Time Interaction**: Status updates are reflected across different user roles instantly (e.g., a rider marking an order as 'Delivered' updates the vendor's view).
- **Rider Logistics**: A dedicated signup and dashboard for delivery riders to manage and fulfill orders.
- **AI-Powered Support**: An integrated chat feature using the Gemini API to provide vendors with instant assistance.
- **Responsive Design**: A mobile-first interface ensures a seamless experience on any device.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API for the support chat feature
- **Charts & Analytics**: Recharts
- **Development Environment**: Vite (via the online IDE)

---

## 👥 User Roles

1.  **Vendor**: The primary customer. Vendors can browse products, place orders, track deliveries, manage their wallet, and get support.
2.  **Admin**: The platform operator. Admins manage products, orders, vendors, and delivery logistics. They have access to analytics to monitor the business's health.
3.  **Rider**: The delivery personnel. Riders can sign up, view available delivery jobs, accept them, and update the delivery status.

---

## 🚦 Getting Started

The application is designed to run in the browser-based development environment.

1.  The entry point is `index.html`, which loads the React application.
2.  The main application logic is contained within `App.tsx`.
3.  Mock data is used to simulate a backend database and can be found in `data.ts`.
4.  To use the AI support chat, an API key for the Gemini API must be configured in the environment variables.
