import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MockDataService } from '../../services/mock-data.service';
import { NotificationDrawerComponent } from '../notification-drawer/notification-drawer.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, NotificationDrawerComponent],
  template: `
    <header class="sticky top-0 z-50 bg-card border-b border-border">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-8">
            <a routerLink="/" class="flex items-center space-x-2">
              <div class="text-2xl font-bold text-primary">MOHAWK</div>
              <div class="text-sm text-muted-foreground">Xchange</div>
            </a>
          </div>

          <!-- Navigation -->
          <nav class="hidden lg:flex items-center space-x-1">
            <a routerLink="/" routerLinkActive="text-primary" [routerLinkActiveOptions]="{exact: true}" 
               class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              Dashboard
            </a>
            <a routerLink="/products" routerLinkActive="text-primary" 
               class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              Products
            </a>
            <a routerLink="/orders" routerLinkActive="text-primary" 
               class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              Orders
            </a>
            <a routerLink="/quotes" routerLinkActive="text-primary" 
               class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              Quotes
            </a>
            <a routerLink="/pricing" routerLinkActive="text-primary" 
               class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              Pricing
            </a>
            <a class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted cursor-pointer">
              Finance
            </a>
            <a class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted cursor-pointer">
              Claims
            </a>
          </nav>

          <!-- Right Section -->
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <div class="hidden md:flex items-center">
              <div class="relative">
                <input
                  type="search"
                  placeholder="Spotlight Search"
                  class="w-64 px-4 py-2 pl-10 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <svg class="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Customer ID -->
            <div class="hidden lg:block text-sm text-muted-foreground">
              {{ user.customerId }}
            </div>

            <!-- Cart -->
            <button (click)="goToCart()" class="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <svg class="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span *ngIf="cartCount > 0" class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                {{ cartCount }}
              </span>
            </button>

            <!-- Notifications -->
            <button (click)="toggleNotifications()" class="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <svg class="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            <!-- User Profile -->
            <div class="flex items-center space-x-2 pl-2 border-l border-border">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {{ user.name.charAt(0) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Notification Drawer -->
    <app-notification-drawer 
      [isOpen]="isNotificationDrawerOpen"
      (closeDrawer)="closeNotifications()">
    </app-notification-drawer>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {
  cartCount = 0;
  user: any;
  isNotificationDrawerOpen = false;

  constructor(
    private cartService: CartService,
    private mockDataService: MockDataService,
    private router: Router
  ) {
    this.user = this.mockDataService.getUser();
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  toggleNotifications(): void {
    this.isNotificationDrawerOpen = !this.isNotificationDrawerOpen;
  }

  closeNotifications(): void {
    this.isNotificationDrawerOpen = false;
  }
}
