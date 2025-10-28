# Application Architecture

This document provides an overview of the technical architecture and design principles of the Hello Shawarma application.

---

## 1. Frontend Technology

The application is a single-page application (SPA) built using modern frontend technologies.

- **React**: The core UI library for building components.
- **TypeScript**: Provides static typing to enhance code quality, readability, and developer experience.
- **Tailwind CSS**: A utility-first CSS framework used for all styling. It allows for rapid development of a consistent and responsive UI directly in the markup.
- **No Backend**: This is a frontend-only prototype. All data is mocked and state is managed within the browser.

---

## 2. Component Structure

The application is primarily contained within a single large component, `App.tsx`. For this prototype stage, this simplifies state management. The structure within `App.tsx` is logically divided into:

- **Views/Pages**: Components that represent a full screen or a major feature area (e.g., `LandingPage`, `VendorDashboard`, `ManageOrders`).
- **Shared Components**: Reusable UI elements like `Card`, `Button`, `Header`, and `Sidebar`. These are defined at the top of the file for clarity.
- **Icon Library**: All SVG icons are organized as separate React components in `components/Icons.tsx` for easy reuse and maintenance.

---

## 3. State Management

State is managed locally within the React component tree.

- **Global State**: The top-level `App` component holds the "global" state for the application, such as the current `user`, the list of `orders`, and `deliveries`.
- **State Propagation**: This global state is passed down to child components via props.
- **State Updates**: Functions to update the state (e.g., `setOrders`, `setDeliveries`) are also passed down as props. For complex updates, functional updates (`setOrders(prevOrders => ...)`) are used to ensure state consistency.
- **Component State**: Individual components use the `useState` hook for managing their own local state, such as form inputs or modal visibility.

---

## 4. Data Flow & Mock Backend

- **Type Definitions (`types.ts`)**: A central file defines all the data structures (interfaces and enums) used throughout the application, such as `User`, `Order`, `Product`, etc. This ensures data consistency.
- **Mock Data (`data.ts`)**: This file acts as a pseudo-database. It exports arrays of mock data that are imported into the `App` component to initialize the application state.
- **Inter-Role Logic**: The interaction between roles is handled within the `App.tsx` component. For example, when a Rider updates a delivery status, the `handleUpdateDeliveryStatus` function in `RiderDashboard` calls the `setOrders` and `setDeliveries` state setters, which are passed down from `App`. This triggers a re-render, and the updated status is reflected in the Vendor and Admin views.

---

## 5. Services and External APIs

- **Gemini Service (`services/geminiService.ts`)**: This module encapsulates all logic for interacting with the Google Gemini API.
  - It safely initializes the `GoogleGenAI` client, checking for the presence of an API key.
  - It exposes a `getChatResponse` function that takes chat history as input, formats it for the API, and returns the AI's response.
  - This separation of concerns keeps API logic out of the UI components.
