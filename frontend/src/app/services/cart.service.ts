import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItems.asObservable();

  constructor() {
    // Load cart from localStorage
    const saved = localStorage.getItem('mohawk_cart');
    if (saved) {
      this.cartItems.next(JSON.parse(saved));
    }
  }

  private saveCart(): void {
    localStorage.setItem('mohawk_cart', JSON.stringify(this.cartItems.value));
  }

  addToCart(product: Product, quantity: number = 1): void {
    const items = this.cartItems.value;
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({
        product,
        quantity,
        reserved: false
      });
    }

    this.cartItems.next(items);
    this.saveCart();
  }

  removeFromCart(productId: string): void {
    const items = this.cartItems.value.filter(item => item.product.id !== productId);
    this.cartItems.next(items);
    this.saveCart();
  }

  updateQuantity(productId: string, quantity: number): void {
    const items = this.cartItems.value;
    const item = items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.cartItems.next(items);
      this.saveCart();
    }
  }

  toggleReserve(productId: string): void {
    const items = this.cartItems.value;
    const item = items.find(item => item.product.id === productId);
    if (item) {
      item.reserved = !item.reserved;
      this.cartItems.next(items);
      this.saveCart();
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveCart();
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.08; // 8% tax
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }
}
