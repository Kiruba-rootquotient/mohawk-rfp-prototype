import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { Order } from '../../models/types';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-background" *ngIf="order">
      <div class="bg-card border-b border-border">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center space-x-2 text-sm text-muted-foreground">
            <a routerLink="/" class="hover:text-foreground">Home</a>
            <span>/</span>
            <a routerLink="/orders" class="hover:text-foreground">Orders</a>
            <span>/</span>
            <span class="text-foreground">{{ order.orderNumber }}</span>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-foreground mb-2">Order {{ order.orderNumber }}</h1>
            <p class="text-muted-foreground">Placed on {{ order.date | date:'MMMM d, y' }}</p>
          </div>
          <span [ngClass]="{
            'badge-info': order.status === 'In Transit',
            'badge-warning': order.status === 'Processing',
            'badge-success': order.status === 'Delivered'
          }" class="text-lg px-4 py-2">
            {{ order.status }}
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="card p-6 mb-6">
              <h2 class="text-xl font-semibold text-foreground mb-4">Order Summary</h2>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Subtotal</span>
                  <span class="font-semibold text-foreground">\${{ order.subtotal.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Tax</span>
                  <span class="font-semibold text-foreground">\${{ order.tax.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Shipping</span>
                  <span class="font-semibold text-foreground">\${{ order.shipping.toLocaleString() }}</span>
                </div>
                <div class="border-t border-border pt-4">
                  <div class="flex justify-between text-lg">
                    <span class="font-semibold text-foreground">Total</span>
                    <span class="font-bold text-foreground text-2xl">\${{ order.total.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="card p-6 mb-6">
              <h2 class="text-lg font-semibold text-foreground mb-4">Shipping Details</h2>
              <div class="space-y-2 text-sm">
                <div class="text-foreground font-medium">{{ order.shipTo }}</div>
                <div *ngIf="order.estimatedArrival" class="text-muted-foreground">
                  Est. Arrival: {{ order.estimatedArrival | date:'MMMM d, y' }}
                </div>
              </div>
            </div>

            <div class="card p-6">
              <h2 class="text-lg font-semibold text-foreground mb-4">Need Help?</h2>
              <p class="text-sm text-muted-foreground mb-4">Contact our support team</p>
              <button class="btn-primary w-full">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class OrderDetailComponent implements OnInit {
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.order = this.mockDataService.getOrderById(id);
    }
  }
}
