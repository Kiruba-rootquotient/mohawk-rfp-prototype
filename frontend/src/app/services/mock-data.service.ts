import { Injectable } from '@angular/core';
import { Order, User } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private user: User = {
    id: '1',
    name: 'Albert Marksmen',
    email: 'albert.marksmen@example.com',
    customerId: 'CUST-19283',
    company: 'Premier Flooring Solutions'
  };

  private orders: Order[] = [
    {
      id: '1',
      orderNumber: '#88219',
      date: new Date('2024-01-15'),
      status: 'In Transit',
      items: [],
      subtotal: 15680.00,
      tax: 1254.40,
      shipping: 125.00,
      total: 17059.40,
      shipTo: 'Chicago, IL',
      estimatedArrival: new Date('2024-01-20')
    },
    {
      id: '2',
      orderNumber: '#88156',
      date: new Date('2024-01-10'),
      status: 'Processing',
      items: [],
      subtotal: 8420.00,
      tax: 673.60,
      shipping: 85.00,
      total: 9178.60,
      shipTo: 'Boston, MA',
      estimatedArrival: new Date('2024-01-18')
    },
    {
      id: '3',
      orderNumber: '#88094',
      date: new Date('2024-01-05'),
      status: 'Delivered',
      items: [],
      subtotal: 12340.00,
      tax: 987.20,
      shipping: 95.00,
      total: 13422.20,
      shipTo: 'New York, NY',
      estimatedArrival: new Date('2024-01-12')
    },
    {
      id: '4',
      orderNumber: '#88032',
      date: new Date('2023-12-28'),
      status: 'Delivered',
      items: [],
      subtotal: 9850.00,
      tax: 788.00,
      shipping: 75.00,
      total: 10713.00,
      shipTo: 'Los Angeles, CA'
    },
    {
      id: '5',
      orderNumber: '#87981',
      date: new Date('2023-12-20'),
      status: 'Delivered',
      items: [],
      subtotal: 18920.00,
      tax: 1513.60,
      shipping: 150.00,
      total: 20583.60,
      shipTo: 'Seattle, WA'
    }
  ];

  private dashboardStats = {
    totalOrders: 847,
    totalOrdersChange: 12.5,
    totalSpend: 284500.00,
    totalSpendChange: 8.3,
    openClaims: 3,
    openClaimsChange: -25.0,
    activeQuotes: 12,
    activeQuotesChange: 15.8
  };

  private spendData = [
    { month: 'Jul', amount: 38000 },
    { month: 'Aug', amount: 42000 },
    { month: 'Sep', amount: 35000 },
    { month: 'Oct', amount: 48000 },
    { month: 'Nov', amount: 52000 },
    { month: 'Dec', amount: 45000 }
  ];

  getUser(): User {
    return this.user;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  getDashboardStats() {
    return this.dashboardStats;
  }

  getSpendData() {
    return this.spendData;
  }

  createOrder(items: any[], subtotal: number, tax: number, shipping: number): Order {
    const newOrder: Order = {
      id: (this.orders.length + 1).toString(),
      orderNumber: `#${88300 + this.orders.length}`,
      date: new Date(),
      status: 'Processing',
      items: items,
      subtotal: subtotal,
      tax: tax,
      shipping: shipping,
      total: subtotal + tax + shipping,
      shipTo: 'Pending Address',
      estimatedArrival: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
    
    this.orders.unshift(newOrder);
    return newOrder;
  }
}
