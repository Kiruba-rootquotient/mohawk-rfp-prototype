import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MockDataService } from '../../services/mock-data.service';
import { NotificationDrawerComponent } from '../notification-drawer/notification-drawer.component';
import { SidebarNavComponent } from '../sidebar-nav/sidebar-nav.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, NotificationDrawerComponent, SidebarNavComponent],
  template: `
    <header class="sticky top-0 z-50 bg-card border-b border-border">
      <div class="flex items-center h-16 px-4">
        <!-- Hamburger Menu -->
        <button (click)="toggleSidebar()" class="p-2 hover:bg-muted rounded-lg transition-colors mr-4">
          <svg class="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Logo (Hidden on mobile when sidebar open) -->
        <a routerLink="/" class="hidden lg:flex items-center space-x-2">
          <div class="text-xl font-bold text-primary">MOHAWK</div>
          <div class="text-xs text-muted-foreground">Xchange</div>
        </a>

        <!-- Search Bar -->
        <div class="flex-1 mx-4 lg:mx-8 max-w-2xl">
          <div class="relative">
            <svg class="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Spotlight Search"
              class="w-full px-4 py-2 pl-10 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-2">
          <!-- Customer ID -->
          <div class="hidden md:flex items-center space-x-1 px-3 py-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
            <span class="text-xs text-muted-foreground">Customer ID:</span>
            <span class="text-sm font-semibold text-foreground">{{ user.customerId }}</span>
            <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Notifications -->
          <button (click)="toggleNotifications()" class="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <svg class="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          <!-- Cart -->
          <button (click)="goToCart()" class="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <svg class="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span *ngIf="cartCount > 0" class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
              {{ cartCount }}
            </span>
          </button>

          <!-- Chat/Support -->
          <button class="p-2 hover:bg-muted rounded-lg transition-colors">
            <svg class="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>

          <!-- User Profile -->
          <div class="flex items-center space-x-2 pl-2 border-l border-border">
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity">
              {{ user.name.charAt(0) }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar Navigation -->
    <app-sidebar-nav 
      [isOpen]="isSidebarOpen"
      (closeDrawer)="closeSidebar()">
    </app-sidebar-nav>

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
  isSidebarOpen = false;

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

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
