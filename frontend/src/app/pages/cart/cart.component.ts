import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/types';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-background">
      <div class="bg-card border-b border-border">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center space-x-2 text-sm text-muted-foreground">
            <a routerLink="/" class="hover:text-foreground">Home</a>
            <span>/</span>
            <span class="text-foreground">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
        <p class="text-muted-foreground mb-8">{{ cartItems.length }} items in your cart</p>

        <div *ngIf="cartItems.length === 0" class="text-center py-20">
          <svg class="w-24 h-24 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 class="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p class="text-muted-foreground mb-6">Add some products to get started</p>
          <a routerLink="/products" class="btn-primary">Browse Products</a>
        </div>

        <div *ngIf="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-4">
            <div *ngFor="let item of cartItems" class="card p-6">
              <div class="flex gap-6">
                <div class="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-border">
                  <img [src]="item.product.image" [alt]="item.product.name" class="w-full h-full object-cover" />
                </div>

                <div class="flex-1">
                  <div class="flex justify-between mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-foreground mb-1">{{ item.product.name }}</h3>
                      <div class="text-sm text-muted-foreground">{{ item.product.sku }} - {{ item.product.boxSize }}</div>
                    </div>
                    <button (click)="removeItem(item.product.id)" class="text-muted-foreground hover:text-error">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div class="flex items-center justify-between mt-4">
                    <div class="flex items-center space-x-3">
                      <button (click)="updateQuantity(item.product.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-muted">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <input type="number" [(ngModel)]="item.quantity" (ngModelChange)="updateQuantity(item.product.id, item.quantity)" min="1" class="w-16 text-center input py-1" />
                      <button (click)="updateQuantity(item.product.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center border border-border rounded hover:bg-muted">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    <div class="text-right">
                      <div class="text-2xl font-bold text-foreground">\${{ (item.product.price * item.quantity).toLocaleString() }}</div>
                      <div class="text-sm text-muted-foreground">\${{ item.product.pricePerBox }} / box</div>
                    </div>
                  </div>

                  <div class="mt-4 flex items-center space-x-4">
                    <label class="flex items-center cursor-pointer group">
                      <input type="checkbox" [checked]="item.reserved" (change)="toggleReserve(item.product.id)" class="w-4 h-4 text-primary bg-muted border-border rounded focus:ring-2 focus:ring-primary" />
                      <span class="ml-2 text-sm text-muted-foreground group-hover:text-foreground">Reserve (7d)</span>
                    </label>
                    <span [ngClass]="item.product.inStock ? 'badge-success' : 'badge-error'">{{ item.product.inStock ? 'In Stock' : 'Out of Stock' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-20">
              <h2 class="text-xl font-semibold text-foreground mb-6">Order Summary</h2>

              <div class="space-y-4 mb-6">
                <div class="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span class="font-semibold text-foreground">\${{ subtotal.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between text-muted-foreground">
                  <span>Tax (Estimated)</span>
                  <span class="font-semibold text-foreground">\${{ tax.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between text-muted-foreground">
                  <span>Freight/Shipping</span>
                  <span class="text-sm">Calculated at checkout</span>
                </div>
              </div>

              <div class="border-t border-border pt-4 mb-6">
                <div class="flex justify-between text-lg">
                  <span class="font-semibold text-foreground">Total (USD)</span>
                  <span class="font-bold text-foreground text-2xl">\${{ total.toLocaleString() }}</span>
                </div>
              </div>

              <a routerLink="/checkout" class="btn-primary w-full mb-3">Proceed to Checkout</a>
              <button class="btn-outline w-full">Save Cart for Later</button>
            </div>

            <div class="card p-6 mt-6 bg-primary/10 border-primary/20">
              <h3 class="text-lg font-semibold text-foreground mb-2">Need help with your order?</h3>
              <p class="text-sm text-muted-foreground mb-4">Our team is here to assist you</p>
              <div class="text-primary font-semibold mb-3">1-800-MOHAWK-1</div>
              <button class="btn-primary w-full">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal = 0;
  tax = 0;
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getSubtotal();
    this.tax = this.cartService.getTax();
    this.total = this.cartService.getTotal();
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  toggleReserve(productId: string): void {
    this.cartService.toggleReserve(productId);
  }
}
