import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { Order } from '../../models/types';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-background">
      <div class="bg-card border-b border-border">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center space-x-2 text-sm text-muted-foreground">
            <a routerLink="/" class="hover:text-foreground">Home</a>
            <span>/</span>
            <span class="text-foreground">Orders</span>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-foreground mb-2">Order History</h1>
        <p class="text-muted-foreground mb-8">View and track all your orders</p>

        <div class="card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-muted">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Ship To</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Est. Arrival</th>
                  <th class="px-6 py-4 text-right text-sm font-semibold text-foreground">Total</th>
                  <th class="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr *ngFor="let order of orders" class="hover:bg-muted/30 transition-colors">
                  <td class="px-6 py-4">
                    <div class="font-semibold text-foreground">{{ order.orderNumber }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-muted-foreground">{{ order.date | date:'MMM d, y' }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-foreground">{{ order.shipTo }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span [ngClass]="{
                      'badge-info': order.status === 'In Transit',
                      'badge-warning': order.status === 'Processing',
                      'badge-success': order.status === 'Delivered',
                      'badge-error': order.status === 'Cancelled'
                    }">
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-muted-foreground">
                      {{ order.estimatedArrival ? (order.estimatedArrival | date:'MMM d') : '-' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="font-semibold text-foreground">\${{ order.total.toLocaleString() }}</div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a [routerLink]="['/order', order.id]" class="text-primary hover:underline text-sm font-medium">
                      View Details
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.orders = this.mockDataService.getOrders();
  }
}
