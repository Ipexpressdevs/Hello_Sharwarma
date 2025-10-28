
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { User, UserRole, Order, Product, Transaction, OrderStatus, ProductCategory, ChatMessage, Delivery } from './types';
import * as mockData from './data';
import * as Icons from './components/Icons';
import { getChatResponse } from './services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- HELPER COMPONENTS ---

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}
const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:scale-100';
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-orange-600 focus:ring-secondary',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-200 focus:ring-gray-400',
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- LANDING & SIGNUP PAGES ---

const LandingPage = ({ onLogin, onBecomeRider }: { onLogin: (role: UserRole) => void; onBecomeRider: () => void; }) => (
  <div className="min-h-screen bg-light text-dark font-sans">
    <header className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-primary">Hello Shawarma</h1>
      <nav className="hidden md:flex space-x-8 items-center">
        <a href="#about" className="hover:text-primary transition">About Us</a>
        <a href="#products" className="hover:text-primary transition">Products</a>
        <a href="#contact" className="hover:text-primary transition">Contact</a>
        <Button onClick={() => onLogin(UserRole.VENDOR)}>Sign In</Button>
      </nav>
    </header>

    <main>
      <section className="text-center py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Your one-stop shawarma supplies partner.</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From premium meats to fresh vegetables and quality packaging, we provide everything your shawarma business needs to thrive.
          </p>
          <div className="space-x-4">
            <Button onClick={() => onLogin(UserRole.VENDOR)} className="px-8 py-3 text-lg">Sign up as a vendor</Button>
            <Button onClick={onBecomeRider} variant="secondary" className="px-8 py-3 text-lg">Become a Rider</Button>
          </div>
           <div className="mt-8">
                <a href="#" onClick={(e) => { e.preventDefault(); onLogin(UserRole.ADMIN); }} className="text-sm text-gray-600 hover:underline">Admin Login</a>
            </div>
        </div>
      </section>
    </main>
  </div>
);

const RiderSignupPage = ({ onSignup, onBack }: { onSignup: (riderData: any) => void; onBack: () => void; }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [vehicleType, setVehicleType] = useState<'Motorcycle' | 'Van' | 'Bicycle'>('Motorcycle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && phone) {
            onSignup({ name, email, phone, vehicleType });
        }
    };

    return (
        <div className="min-h-screen bg-light flex flex-col justify-center items-center p-4 font-sans">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary">Hello Shawarma</h1>
                    <h2 className="text-2xl mt-2 font-semibold text-gray-700">Become a Delivery Rider</h2>
                    <p className="text-gray-500 mt-2">Join our team and earn by delivering supplies to local vendors.</p>
                </div>
                <Card className="w-full">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                            <select value={vehicleType} onChange={e => setVehicleType(e.target.value as any)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                                <option>Motorcycle</option>
                                <option>Van</option>
                                <option>Bicycle</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full !mt-6 py-3">Create Account</Button>
                    </form>
                </Card>
                <div className="text-center mt-4">
                    <button onClick={onBack} className="text-sm text-gray-600 hover:underline">
                        &larr; Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- SHARED LAYOUT COMPONENTS ---

const Header = ({ user, onLogout, onMenuClick }: { user: User; onLogout: () => void; onMenuClick: () => void }) => (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <button onClick={onMenuClick} className="lg:hidden text-gray-600 p-2 rounded-md hover:bg-gray-100">
            <Icons.MenuIcon className="h-6 w-6" />
        </button>
        <div className="lg:hidden" /> {/* Spacer */}
        <div className="hidden lg:block" /> {/* Original Spacer for desktop */}
        <div className="flex items-center space-x-4">
            <div className="text-right">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.companyName || user.role}</p>
            </div>
            <button onClick={onLogout} className="text-gray-500 hover:text-primary p-2 rounded-full">
                <Icons.LogoutIcon className="h-6 w-6" />
            </button>
        </div>
    </header>
);

const Sidebar = ({ navItems, activePage, setActivePage, isOpen, onClose }: { navItems: any[], activePage: string, setActivePage: (page: string) => void, isOpen: boolean, onClose: () => void }) => (
    <aside className={`fixed inset-y-0 left-0 w-64 bg-dark text-white flex flex-col transform transition-transform duration-300 ease-in-out z-40 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center justify-between px-4">
            <h1 className="text-2xl font-bold text-white">Hello Shawarma</h1>
            <button onClick={onClose} className="lg:hidden text-white p-2 rounded-md hover:bg-gray-700">
                <Icons.XIcon className="h-6 w-6" />
            </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map(item => (
                <a
                    key={item.name}
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActivePage(item.name); onClose(); }}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${activePage === item.name ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}
                >
                    <item.icon className="h-6 w-6 mr-3" />
                    <span>{item.name}</span>
                </a>
            ))}
        </nav>
    </aside>
);

// --- VENDOR-SPECIFIC PAGES ---

const VendorDashboard = ({ user, orders, deliveries }: { user: User; orders: Order[]; deliveries: Delivery[] }) => {
  const recentTransactions = mockData.TRANSACTIONS.slice(0, 5);
  const pendingDeliveries = orders.filter(o => o.vendorId === user.id && o.status === OrderStatus.PROCESSING).length;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user.name.split(' ')[0]}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full"><Icons.OrdersIcon className="h-8 w-8 text-primary"/></div>
            <div>
                <p className="text-gray-500">Total Orders</p>
                <p className="text-3xl font-bold text-gray-800">{orders.filter(o => o.vendorId === user.id).length}</p>
            </div>
        </Card>
        <Card className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-full"><Icons.TruckIcon className="h-8 w-8 text-secondary"/></div>
             <div>
                <p className="text-gray-500">Pending Deliveries</p>
                <p className="text-3xl font-bold text-gray-800">{pendingDeliveries}</p>
            </div>
        </Card>
        <Card className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full"><Icons.WalletIcon className="h-8 w-8 text-green-500"/></div>
             <div>
                <p className="text-gray-500">Wallet Balance</p>
                <p className="text-3xl font-bold text-gray-800">${user.walletBalance?.toFixed(2)}</p>
            </div>
        </Card>
      </div>
      <Card>
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(tx => (
                <tr key={tx.id} className="border-b border-gray-100">
                  <td className="py-3 text-gray-600">{tx.date.toLocaleDateString()}</td>
                  <td className="py-3 text-gray-800">{tx.description}</td>
                  <td className={`py-3 text-right font-semibold ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'Credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const ProductCatalog = () => {
    const [products, setProducts] = useState(mockData.PRODUCTS);
    const [filter, setFilter] = useState<ProductCategory | 'All'>('All');

    const filteredProducts = useMemo(() => {
        if (filter === 'All') return products;
        return products.filter(p => p.category === filter);
    }, [filter, products]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Products</h2>
                <select 
                    value={filter} 
                    onChange={e => setFilter(e.target.value as ProductCategory | 'All')}
                    className="p-2 border rounded-md shadow-sm bg-white"
                >
                    <option value="All">All Categories</option>
                    {Object.values(ProductCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(p => (
                    <Card key={p.id} className="flex flex-col">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold">{p.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{p.category}</p>
                            <p className="text-2xl font-bold text-primary mb-2">${p.unitPrice.toFixed(2)}</p>
                            <p className="text-xs text-green-600 mb-4">
                                {p.bulkDiscount.discountPercentage}% off on {p.bulkDiscount.quantity}+ units
                            </p>
                            <div className="mt-auto">
                                <Button className="w-full">Add to Cart</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const OrderHistory = ({ user, orders }: { user: User; orders: Order[] }) => {
    const userOrders = orders.filter(o => o.vendorId === user.id);
    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.DELIVERED: return 'bg-green-100 text-green-800';
            case OrderStatus.PROCESSING: return 'bg-blue-100 text-blue-800';
            case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
            case OrderStatus.CANCELLED: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (
        <Card>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h2>
            <table className="w-full text-left">
                <thead className="border-b">
                    <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userOrders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-mono text-sm">#{order.id}</td>
                            <td className="p-3">{order.orderDate.toLocaleDateString()}</td>
                            <td className="p-3 font-semibold">${order.totalAmount.toFixed(2)}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="p-3 space-x-2">
                                <Button variant="ghost" className="text-sm px-2 py-1">Invoice</Button>
                                <Button variant="secondary" className="text-sm px-2 py-1">Reorder</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
};

const Wallet = ({ user }: { user: User }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <Card className="text-center">
                <p className="text-gray-500 mb-2">Current Balance</p>
                <p className="text-5xl font-bold text-primary mb-6">${user.walletBalance?.toFixed(2)}</p>
                <Button className="w-full text-lg py-3">Top-up Balance</Button>
                <p className="text-xs text-gray-400 mt-2">Powered by Paystack</p>
            </Card>
             <Card className="mt-6 text-center bg-gradient-to-r from-secondary to-orange-400 text-white">
                <h3 className="font-bold text-lg">Refer a friend!</h3>
                <p className="mt-1">Get $50 bonus for every vendor you refer.</p>
             </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
                 <table className="w-full text-left">
                    <thead>
                    <tr className="border-b">
                        <th className="py-2">Date</th>
                        <th className="py-2">Description</th>
                        <th className="py-2 text-right">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mockData.TRANSACTIONS.map(tx => (
                        <tr key={tx.id} className="border-b border-gray-100">
                        <td className="py-3 text-gray-600">{tx.date.toLocaleDateString()}</td>
                        <td className="py-3 text-gray-800">{tx.description}</td>
                        <td className={`py-3 text-right font-semibold ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                            {tx.type === 'Credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Card>
        </div>
    </div>
);


const SupportChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, text: "Hello! How can I help you today?", sender: 'support', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            text: input,
            sender: 'vendor',
            timestamp: new Date()
        };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await getChatResponse(newMessages);
            const supportMessage: ChatMessage = {
                id: Date.now() + 1,
                text: responseText,
                sender: 'support',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, supportMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = {
                id: Date.now() + 1,
                text: "Sorry, I couldn't connect. Please try again.",
                sender: 'support',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="h-[75vh] flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-4">Support Chat</h2>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${msg.sender === 'vendor' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                            <p>{msg.text}</p>
                            <p className="text-xs text-right mt-1 opacity-75">{msg.timestamp.toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-800 rounded-xl rounded-bl-none px-4 py-2">
                           <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="mt-4 border-t pt-4 flex">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-l-md focus:ring-primary focus:border-primary"
                    disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading} className="rounded-l-none">
                    <Icons.SendIcon className="h-5 w-5"/>
                </Button>
            </div>
        </Card>
    );
};


// --- ADMIN-SPECIFIC PAGES ---

const AdminDashboard = ({ orders }: { orders: Order[] }) => (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card><p className="font-semibold">Total Revenue</p><p className="text-3xl font-bold mt-2 text-primary">$15,480.50</p></Card>
            <Card><p className="font-semibold">Active Vendors</p><p className="text-3xl font-bold mt-2 text-primary">{mockData.VENDORS.length}</p></Card>
            <Card><p className="font-semibold">Pending Orders</p><p className="text-3xl font-bold mt-2 text-primary">{orders.filter(o => o.status === OrderStatus.PENDING).length}</p></Card>
            <Card><p className="font-semibold">Products in Stock</p><p className="text-3xl font-bold mt-2 text-primary">{mockData.PRODUCTS.length}</p></Card>
        </div>
    </div>
);

const ManageOrders = ({ orders, setOrders, deliveries, setDeliveries }: { orders: Order[], setOrders: (orders: Order[]) => void; deliveries: Delivery[], setDeliveries: (deliveries: Delivery[]) => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedRider, setSelectedRider] = useState<string>('');
    const riders = mockData.RIDERS;

    const handleOpenModal = (order: Order) => {
        setSelectedOrder(order);
        setSelectedRider(riders[0]?.id || '');
        setIsModalOpen(true);
    };

    const handleAssignRider = () => {
        if (!selectedOrder || !selectedRider) return;
        const delivery = deliveries.find(d => d.orderId === selectedOrder.id);
        if (delivery) {
            setDeliveries(deliveries.map(d => d.id === delivery.id ? { ...d, riderId: selectedRider } : d));
        }
        setIsModalOpen(false);
        setSelectedOrder(null);
    };
    
    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

     const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.DELIVERED: return 'bg-green-100 text-green-800';
            case OrderStatus.PROCESSING: return 'bg-blue-100 text-blue-800';
            case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
            case OrderStatus.CANCELLED: return 'bg-red-100 text-red-800';
        }
    };
    
    const findDelivery = (orderId: string) => deliveries.find(d => d.orderId === orderId);
    const findRiderName = (riderId?: string) => riderId ? mockData.RIDERS.find(r => r.id === riderId)?.name : 'Unassigned';

    return (
        <>
            <Card>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b">
                            <tr>
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Vendor</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Delivery</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => {
                                const delivery = findDelivery(order.id);
                                return (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-mono text-sm">#{order.id}</td>
                                    <td className="p-3">{mockData.VENDORS.find(v => v.id === order.vendorId)?.companyName}</td>
                                    <td className="p-3">{order.orderDate.toLocaleDateString()}</td>
                                    <td className="p-3 font-semibold">${order.totalAmount.toFixed(2)}</td>
                                    <td className="p-3">
                                        <select 
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                            className={`p-1 rounded-md border-none text-xs font-semibold bg-transparent ${getStatusColor(order.status)}`}
                                        >
                                            {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                    <td className="p-3">
                                        {order.status === OrderStatus.PROCESSING && delivery ? (
                                            delivery.riderId ? (
                                                <div className="flex items-center">
                                                    <Icons.MotorcycleIcon className="h-5 w-5 mr-2 text-gray-600" />
                                                    {findRiderName(delivery.riderId)}
                                                </div>
                                            ) : (
                                                <Button variant="secondary" className="text-xs px-2 py-1" onClick={() => handleOpenModal(order)}>Assign Rider</Button>
                                            )
                                        ) : (
                                            <span className="text-gray-400 text-sm italic">{order.status === OrderStatus.DELIVERED ? 'Completed' : 'Awaiting Processing'}</span>
                                        )}
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </Card>

            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <Card className="w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Assign Rider to Order #{selectedOrder.id}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select Rider</label>
                                <select value={selectedRider} onChange={e => setSelectedRider(e.target.value)} className="mt-1 block w-full p-2 border rounded-md shadow-sm bg-white">
                                    {riders.map(r => <option key={r.id} value={r.id}>{r.name} - {r.vehicleType}</option>)}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button onClick={handleAssignRider}>Assign</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};

const Analytics = () => {
    const topSellingData = mockData.PRODUCTS.slice(0, 5).map(p => ({ name: p.name, sold: 150 - p.stock/5 }));
    const revenueData = [
        { name: 'Week 1', revenue: 4000 },
        { name: 'Week 2', revenue: 3000 },
        { name: 'Week 3', revenue: 2000 },
        { name: 'Week 4', revenue: 2780 },
    ];
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-semibold mb-4">Top Selling Items</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topSellingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sold" fill="#DC2626" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card>
                    <h3 className="text-xl font-semibold mb-4">Weekly Revenue</h3>
                    <ResponsiveContainer width="100%" height={300}>
                         <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                            <Bar dataKey="revenue" fill="#F97316" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

// --- RIDER-SPECIFIC PAGES ---

// FIX: Update prop type for setOrders to correctly handle functional updates.
const RiderDashboard = ({ user, deliveries, setDeliveries, setOrders }: { user: User, deliveries: Delivery[], setDeliveries: (d: Delivery[]) => void, setOrders: React.Dispatch<React.SetStateAction<Order[]>> }) => {
    
    const handleAcceptDelivery = (deliveryId: string) => {
        setDeliveries(deliveries.map(d => d.id === deliveryId ? { ...d, riderId: user.id, status: 'Picked Up' } : d));
    };

    const handleUpdateDeliveryStatus = (deliveryId: string, status: 'Picked Up' | 'Delivered') => {
        setDeliveries(deliveries.map(d => {
            if (d.id === deliveryId) {
                if(status === 'Delivered') {
                    // Also update the main order status
                    setOrders(prevOrders => prevOrders.map(o => o.id === d.orderId ? {...o, status: OrderStatus.DELIVERED} : o));
                }
                return { ...d, status: status };
            }
            return d;
        }));
    };

    const assignedDeliveries = deliveries.filter(d => d.riderId === user.id && d.status !== 'Delivered');
    const availableDeliveries = deliveries.filter(d => !d.riderId && d.status === 'Pending');
    
    const getVendorName = (orderId: string) => {
        const order = mockData.ORDERS.find(o => o.id === orderId);
        if (!order) return 'Unknown Vendor';
        const vendor = mockData.VENDORS.find(v => v.id === order.vendorId);
        return vendor?.companyName || 'Unknown Vendor';
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Rider Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <Card>
                    <p className="font-semibold">Assigned Deliveries</p>
                    <p className="text-3xl font-bold mt-2 text-primary">{assignedDeliveries.length}</p>
                </Card>
                 <Card>
                    <p className="font-semibold">Available for Pickup</p>
                    <p className="text-3xl font-bold mt-2 text-primary">{availableDeliveries.length}</p>
                </Card>
                 <Card>
                    <p className="font-semibold">Earnings this week</p>
                    <p className="text-3xl font-bold mt-2 text-primary">$245.50</p>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-semibold mb-4">Your Active Deliveries</h3>
                    <div className="space-y-4">
                        {assignedDeliveries.map(d => (
                            <div key={d.id} className="p-4 border rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Order #{d.orderId} to {getVendorName(d.orderId)}</p>
                                    <p className="text-sm text-gray-500 flex items-center"><Icons.MapPinIcon className="h-4 w-4 mr-2"/> {d.deliveryAddress}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${d.status === 'Picked Up' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{d.status}</span>
                                     {d.status === 'Picked Up' && (
                                         <Button variant="primary" className="text-xs px-2 py-1" onClick={() => handleUpdateDeliveryStatus(d.id, 'Delivered')}>Mark Delivered</Button>
                                     )}
                                </div>
                            </div>
                        ))}
                        {assignedDeliveries.length === 0 && <p className="text-gray-500">No active deliveries.</p>}
                    </div>
                </Card>
                <Card>
                    <h3 className="text-xl font-semibold mb-4">Available for Pickup</h3>
                    <div className="space-y-4">
                        {availableDeliveries.map(d => (
                             <div key={d.id} className="p-4 border rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">Order #{d.orderId} to {getVendorName(d.orderId)}</p>
                                    <p className="text-sm text-gray-500 flex items-center"><Icons.MapPinIcon className="h-4 w-4 mr-2"/>{d.deliveryAddress}</p>
                                </div>
                                <Button variant="secondary" className="text-sm px-3 py-1" onClick={() => handleAcceptDelivery(d.id)}>Accept</Button>
                            </div>
                        ))}
                         {availableDeliveries.length === 0 && <p className="text-gray-500">No available deliveries right now.</p>}
                    </div>
                </Card>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

function App() {
  const [view, setView] = useState<'landing' | 'app' | 'riderSignup'>('landing');
  const [user, setUser] = useState<User | null>(null);
  
  // App-wide state
  const [orders, setOrders] = useState<Order[]>(mockData.ORDERS);
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockData.DELIVERIES);

  const [activeVendorPage, setActiveVendorPage] = useState('Dashboard');
  const [activeAdminPage, setActiveAdminPage] = useState('Dashboard');
  const [activeRiderPage, setActiveRiderPage] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleLogin = (role: UserRole) => {
    if (role === UserRole.VENDOR) setUser(mockData.VENDORS[0]);
    else if (role === UserRole.ADMIN) setUser(mockData.ADMINS[0]);
    else if (role === UserRole.RIDER) setUser(mockData.RIDERS[0]); // Test rider login
    setView('app');
  };

  const handleRiderSignup = (riderData: Omit<User, 'id' | 'role'>) => {
      const newRider: User = {
          id: `rider${mockData.RIDERS.length + 1}`,
          role: UserRole.RIDER,
          ...riderData,
      };
      setUser(newRider);
      setView('app');
  }

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const vendorNavItems = useMemo(() => [
    { name: 'Dashboard', icon: Icons.DashboardIcon },
    { name: 'Products', icon: Icons.ProductsIcon },
    { name: 'Orders', icon: Icons.OrdersIcon },
    { name: 'Wallet', icon: Icons.WalletIcon },
    { name: 'Support', icon: Icons.SupportIcon },
  ], []);

  const adminNavItems = useMemo(() => [
    { name: 'Dashboard', icon: Icons.DashboardIcon },
    { name: 'Analytics', icon: Icons.AnalyticsIcon },
    { name: 'Manage Orders', icon: Icons.OrdersIcon },
    { name: 'Manage Products', icon: Icons.ProductsIcon },
    { name: 'Manage Vendors', icon: Icons.VendorsIcon },
  ], []);
  
  const riderNavItems = useMemo(() => [
    { name: 'Dashboard', icon: Icons.DashboardIcon },
    { name: 'Deliveries', icon: Icons.MotorcycleIcon },
    { name: 'Earnings', icon: Icons.EarningsIcon },
  ], []);
  
  if (view === 'landing') {
    return <LandingPage onLogin={handleLogin} onBecomeRider={() => setView('riderSignup')} />;
  }

  if (view === 'riderSignup') {
    return <RiderSignupPage onSignup={handleRiderSignup} onBack={() => setView('landing')} />;
  }

  if (view === 'app' && user) {
    const renderVendorPage = () => {
        switch (activeVendorPage) {
            case 'Dashboard': return <VendorDashboard user={user} orders={orders} deliveries={deliveries} />;
            case 'Products': return <ProductCatalog />;
            case 'Orders': return <OrderHistory user={user} orders={orders} />;
            case 'Wallet': return <Wallet user={user}/>;
            case 'Support': return <SupportChat />;
            default: return <VendorDashboard user={user} orders={orders} deliveries={deliveries} />;
        }
    };

    const renderAdminPage = () => {
        switch(activeAdminPage) {
            case 'Dashboard': return <AdminDashboard orders={orders} />;
            case 'Manage Orders': return <ManageOrders orders={orders} setOrders={setOrders} deliveries={deliveries} setDeliveries={setDeliveries} />;
            case 'Analytics': return <Analytics />;
            case 'Manage Products': return <p>Product Management Coming Soon</p>;
            case 'Manage Vendors': return <p>Vendor Management Coming Soon</p>;
            default: return <AdminDashboard orders={orders} />;
        }
    }

    const renderRiderPage = () => {
        switch(activeRiderPage) {
            case 'Dashboard': return <RiderDashboard user={user} deliveries={deliveries} setDeliveries={setDeliveries} setOrders={setOrders} />;
            case 'Deliveries': return <RiderDashboard user={user} deliveries={deliveries} setDeliveries={setDeliveries} setOrders={setOrders}/>; // Placeholder
            case 'Earnings': return <RiderDashboard user={user} deliveries={deliveries} setDeliveries={setDeliveries} setOrders={setOrders}/>; // Placeholder
            default: return <RiderDashboard user={user} deliveries={deliveries} setDeliveries={setDeliveries} setOrders={setOrders}/>;
        }
    }

    const getNavItems = () => {
        if(user.role === UserRole.VENDOR) return vendorNavItems;
        if(user.role === UserRole.ADMIN) return adminNavItems;
        if(user.role === UserRole.RIDER) return riderNavItems;
        return [];
    }
    
    const getActivePage = () => {
        if(user.role === UserRole.VENDOR) return activeVendorPage;
        if(user.role === UserRole.ADMIN) return activeAdminPage;
        if(user.role === UserRole.RIDER) return activeRiderPage;
        return '';
    }

    const setActivePage = (page: string) => {
        if(user.role === UserRole.VENDOR) setActiveVendorPage(page);
        if(user.role === UserRole.ADMIN) setActiveAdminPage(page);
        if(user.role === UserRole.RIDER) setActiveRiderPage(page);
    }

    return (
        <div className="relative min-h-screen lg:flex font-sans text-dark bg-light">
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
            <Sidebar
                navItems={getNavItems()}
                activePage={getActivePage()}
                setActivePage={setActivePage}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    user={user} 
                    onLogout={handleLogout} 
                    onMenuClick={() => setIsSidebarOpen(true)}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light p-4 md:p-8">
                    {user.role === UserRole.VENDOR && renderVendorPage()}
                    {user.role === UserRole.ADMIN && renderAdminPage()}
                    {user.role === UserRole.RIDER && renderRiderPage()}
                </main>
            </div>
        </div>
    );
  }

  // Fallback if state is inconsistent
  return <LandingPage onLogin={handleLogin} onBecomeRider={() => setView('riderSignup')} />;
}

export default App;
