import { Product, ProductCategory, User, UserRole, Order, OrderStatus, Transaction, TransactionType, Delivery } from './types';

export const VENDORS: User[] = [
  { id: 'vendor1', name: 'Ali\'s Shawarma', companyName: 'Ali\'s Shawarma Spot', role: UserRole.VENDOR, email: 'ali@shawarma.com', walletBalance: 1250.75 },
  { id: 'vendor2', name: 'Fatima\'s Grill', companyName: 'Fatima\'s Grill House', role: UserRole.VENDOR, email: 'fatima@grill.com', walletBalance: 830.20 },
];

export const ADMINS: User[] = [
  { id: 'admin1', name: 'Admin User', companyName: 'Hello Shawarma HQ', role: UserRole.ADMIN, email: 'admin@helloshawarma.com' },
];

export const RIDERS: User[] = [
  { id: 'rider1', name: 'Karim Ahmed', role: UserRole.RIDER, email: 'karim@delivery.com', phone: '+1234567890', vehicleType: 'Motorcycle' },
  { id: 'rider2', name: 'Samira Hassan', role: UserRole.RIDER, email: 'samira@delivery.com', phone: '+1234567891', vehicleType: 'Van' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Chicken Breast (kg)', category: ProductCategory.INGREDIENTS, unitPrice: 8.50, bulkDiscount: { quantity: 50, discountPercentage: 10 }, imageUrl: 'https://picsum.photos/seed/chicken/400/300', stock: 500 },
  { id: 'p2', name: 'Beef Sirloin (kg)', category: ProductCategory.INGREDIENTS, unitPrice: 12.00, bulkDiscount: { quantity: 50, discountPercentage: 12 }, imageUrl: 'https://picsum.photos/seed/beef/400/300', stock: 350 },
  { id: 'p3', name: 'Pita Bread (100 pack)', category: ProductCategory.INGREDIENTS, unitPrice: 15.00, bulkDiscount: { quantity: 20, discountPercentage: 5 }, imageUrl: 'https://picsum.photos/seed/pita/400/300', stock: 1000 },
  { id: 'p4', name: 'Tomatoes (box)', category: ProductCategory.VEGETABLES, unitPrice: 20.00, bulkDiscount: { quantity: 10, discountPercentage: 8 }, imageUrl: 'https://picsum.photos/seed/tomatoes/400/300', stock: 80 },
  { id: 'p5', name: 'Lettuce (box)', category: ProductCategory.VEGETABLES, unitPrice: 18.00, bulkDiscount: { quantity: 10, discountPercentage: 8 }, imageUrl: 'https://picsum.photos/seed/lettuce/400/300', stock: 120 },
  { id: 'p6', name: 'Garlic Sauce (gallon)', category: ProductCategory.SPICES, unitPrice: 25.00, bulkDiscount: { quantity: 5, discountPercentage: 10 }, imageUrl: 'https://picsum.photos/seed/garlic/400/300', stock: 200 },
  { id: 'p7', name: 'Paprika (kg)', category: ProductCategory.SPICES, unitPrice: 10.00, bulkDiscount: { quantity: 10, discountPercentage: 15 }, imageUrl: 'https://picsum.photos/seed/paprika/400/300', stock: 300 },
  { id: 'p8', name: 'Wrapping Paper (1000 sheets)', category: ProductCategory.PACKAGING, unitPrice: 30.00, bulkDiscount: { quantity: 10, discountPercentage: 5 }, imageUrl: 'https://picsum.photos/seed/paper/400/300', stock: 400 },
  { id: 'p9', name: 'Vertical Broiler', category: ProductCategory.EQUIPMENT, unitPrice: 1200.00, bulkDiscount: { quantity: 2, discountPercentage: 10 }, imageUrl: 'https://picsum.photos/seed/broiler/400/300', stock: 15 },
  { id: 'p10', name: 'Soft Drinks (24 pack)', category: ProductCategory.DRINKS, unitPrice: 12.50, bulkDiscount: { quantity: 20, discountPercentage: 7 }, imageUrl: 'https://picsum.photos/seed/soda/400/300', stock: 600 },
];

export const ORDERS: Order[] = [
    { id: 'o1', vendorId: 'vendor1', items: [{ product: PRODUCTS[0], quantity: 20, deliveryFrequency: 'Weekly' }, { product: PRODUCTS[2], quantity: 10, deliveryFrequency: 'Weekly' }], totalAmount: 320.00, status: OrderStatus.DELIVERED, orderDate: new Date('2023-10-10'), deliveryDate: new Date('2023-10-12') },
    { id: 'o2', vendorId: 'vendor1', items: [{ product: PRODUCTS[3], quantity: 5, deliveryFrequency: 'One-time' }], totalAmount: 100.00, status: OrderStatus.PROCESSING, orderDate: new Date('2023-10-25') },
    { id: 'o3', vendorId: 'vendor2', items: [{ product: PRODUCTS[1], quantity: 30, deliveryFrequency: 'Bi-weekly' }, { product: PRODUCTS[5], quantity: 4, deliveryFrequency: 'Bi-weekly' }], totalAmount: 460.00, status: OrderStatus.PENDING, orderDate: new Date('2023-10-28') },
    { id: 'o4', vendorId: 'vendor1', items: [{ product: PRODUCTS[7], quantity: 50, deliveryFrequency: 'One-time' }], totalAmount: 150.00, status: OrderStatus.PENDING, orderDate: new Date('2023-10-29') },
];

export const TRANSACTIONS: Transaction[] = [
    { id: 't1', date: new Date('2023-10-20'), description: 'Wallet Top-up', amount: 500.00, type: TransactionType.CREDIT },
    { id: 't2', date: new Date('2023-10-10'), description: 'Order #o1 Payment', amount: 320.00, type: TransactionType.DEBIT },
    { id: 't3', date: new Date('2023-10-05'), description: 'Referral Bonus', amount: 50.00, type: TransactionType.CREDIT },
    { id: 't4', date: new Date('2023-09-28'), description: 'Order #o0 Payment', amount: 450.50, type: TransactionType.DEBIT },
];

export const DELIVERIES: Delivery[] = [
    { id: 'd1', orderId: 'o2', riderId: 'rider1', pickupAddress: 'Hello Shawarma HQ', deliveryAddress: 'Ali\'s Shawarma Spot', status: 'Picked Up' },
    { id: 'd2', orderId: 'o3', riderId: 'rider1', pickupAddress: 'Hello Shawarma HQ', deliveryAddress: 'Fatima\'s Grill House', status: 'Pending' },
    { id: 'd3', orderId: 'o4', riderId: undefined, pickupAddress: 'Hello Shawarma HQ', deliveryAddress: 'Ali\'s Shawarma Spot', status: 'Pending' }
];
