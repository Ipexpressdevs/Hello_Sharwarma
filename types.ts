export enum UserRole {
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
  RIDER = 'RIDER',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  // Vendor specific
  companyName?: string;
  walletBalance?: number;
  // Rider specific
  phone?: string;
  vehicleType?: 'Motorcycle' | 'Van' | 'Bicycle';
}

export enum ProductCategory {
  INGREDIENTS = 'Ingredients',
  VEGETABLES = 'Vegetables',
  SPICES = 'Spices',
  PACKAGING = 'Packaging',
  EQUIPMENT = 'Equipment',
  DRINKS = 'Drinks',
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  unitPrice: number;
  bulkDiscount: {
    quantity: number;
    discountPercentage: number;
  };
  imageUrl: string;
  stock: number;
}

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface OrderItem {
  product: Product;
  quantity: number;
  deliveryFrequency: 'One-time' | 'Weekly' | 'Bi-weekly';
}

export interface Order {
  id: string;
  vendorId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderDate: Date;
  deliveryDate?: Date;
}

export enum TransactionType {
  DEBIT = 'Debit',
  CREDIT = 'Credit',
}

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'vendor' | 'support';
  timestamp: Date;
}

export interface Delivery {
  id: string;
  orderId: string;
  riderId?: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: 'Pending' | 'Picked Up' | 'Delivered';
}
