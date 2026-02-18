import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: string;
  type: 'order' | 'quote' | 'claim' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

@Component({
  selector: 'app-notification-drawer',
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" (click)="close()"></div>
      
      <!-- Drawer -->
      <div class="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 class="text-2xl font-bold text-foreground">Notifications</h2>
            <p class="text-sm text-muted-foreground mt-1">{{ unreadCount }} unread</p>
          </div>
          <button (click)="close()" class="p-2 hover:bg-muted rounded-lg transition-colors">
            <svg class="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between p-4 border-b border-border">
          <button (click)="markAllAsRead()" class="text-sm text-primary hover:underline">
            Mark all as read
          </button>
          <button class="text-sm text-muted-foreground hover:text-foreground">
            Settings
          </button>
        </div>

        <!-- Notifications List -->
        <div class="overflow-y-auto h-[calc(100vh-180px)]">
          <div *ngIf="notifications.length === 0" class="flex flex-col items-center justify-center py-20">
            <svg class="w-16 h-16 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p class="text-muted-foreground">No notifications yet</p>
          </div>

          <div *ngFor="let notification of notifications" 
               [class.bg-muted/30]="!notification.read"
               class="border-b border-border hover:bg-muted/20 transition-colors cursor-pointer"
               (click)="markAsRead(notification.id)">
            <div class="p-4">
              <div class="flex items-start space-x-3">
                <!-- Icon based on type -->
                <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                     [ngClass]="{
                       'bg-info/10': notification.type === 'order',
                       'bg-warning/10': notification.type === 'quote',
                       'bg-error/10': notification.type === 'claim',
                       'bg-success/10': notification.type === 'system'
                     }">
                  <svg *ngIf="notification.type === 'order'" class="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <svg *ngIf="notification.type === 'quote'" class="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <svg *ngIf="notification.type === 'claim'" class="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <svg *ngIf="notification.type === 'system'" class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <h3 class="text-sm font-semibold text-foreground truncate">{{ notification.title }}</h3>
                    <span *ngIf="!notification.read" class="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                  </div>
                  <p class="text-sm text-muted-foreground line-clamp-2">{{ notification.message }}</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs text-muted-foreground">{{ getTimeAgo(notification.timestamp) }}</span>
                    <button *ngIf="notification.actionUrl" class="text-xs text-primary hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class NotificationDrawerComponent {
  @Input() isOpen = false;
  @Output() closeDrawer = new EventEmitter<void>();

  notifications: Notification[] = [
    {
      id: '1',
      type: 'order',
      title: 'Order #88219 Shipped',
      message: 'Your order has been shipped and is on the way. Expected delivery: Jan 20, 2024',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/orders/1'
    },
    {
      id: '2',
      type: 'quote',
      title: 'Quote Q-2024-002 Approved',
      message: 'Your quote for Downtown Office Complex has been approved. Total: $45,600',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/quotes/2'
    },
    {
      id: '3',
      type: 'system',
      title: 'New Pricing Available',
      message: 'Updated dealer pricing is now available. Check out your new discounts!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/pricing'
    },
    {
      id: '4',
      type: 'claim',
      title: 'Claim #C-892 Updated',
      message: 'Your claim has been reviewed and approved for processing.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true
    },
    {
      id: '5',
      type: 'order',
      title: 'Low Stock Alert',
      message: 'Item BT416 Solve II Tile is running low in stock. Order now to secure inventory.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true
    }
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  close(): void {
    this.closeDrawer.emit();
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
  }

  getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  }
}
