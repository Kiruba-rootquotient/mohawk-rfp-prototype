import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-background">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <!-- Step Indicator -->
            <div class="flex items-center justify-between mb-8">
              <div *ngFor="let s of steps; let i = index" class="flex items-center" [ngClass]="{'flex-1': i < steps.length - 1}">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center" 
                       [ngClass]="step >= i + 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'">
                    {{ i + 1 }}
                  </div>
                  <span class="ml-3 text-sm font-medium" [ngClass]="step >= i + 1 ? 'text-foreground' : 'text-muted-foreground'">
                    {{ s }}
                  </span>
                </div>
                <div *ngIf="i < steps.length - 1" class="flex-1 h-0.5 mx-4" [ngClass]="step > i + 1 ? 'bg-primary' : 'bg-muted'"></div>
              </div>
            </div>

            <!-- Step 1: Shipping -->
            <div *ngIf="step === 1" class="card p-6">
              <h2 class="text-xl font-semibold text-foreground mb-6">Shipping Address</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" [(ngModel)]="shippingInfo.firstName" placeholder="First Name" class="input" />
                <input type="text" [(ngModel)]="shippingInfo.lastName" placeholder="Last Name" class="input" />
                <input type="text" [(ngModel)]="shippingInfo.company" placeholder="Company" class="input md:col-span-2" />
                <input type="text" [(ngModel)]="shippingInfo.address1" placeholder="Address Line 1" class="input md:col-span-2" />
                <input type="text" [(ngModel)]="shippingInfo.address2" placeholder="Address Line 2" class="input md:col-span-2" />
                <input type="text" [(ngModel)]="shippingInfo.city" placeholder="City" class="input" />
                <input type="text" [(ngModel)]="shippingInfo.state" placeholder="State" class="input" />
                <input type="text" [(ngModel)]="shippingInfo.zip" placeholder="ZIP Code" class="input" />
                <input type="text" [(ngModel)]="shippingInfo.country" placeholder="Country" class="input" />
              </div>
              <button (click)="nextStep()" class="btn-primary mt-6">Continue to Shipping Method</button>
            </div>

            <!-- Step 2: Shipping Method -->
            <div *ngIf="step === 2" class="card p-6">
              <h2 class="text-xl font-semibold text-foreground mb-6">Shipping Method</h2>
              <div class="space-y-3">
                <label *ngFor="let method of shippingMethods" class="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                  <div class="flex items-center">
                    <input type="radio" name="shipping" [value]="method.id" [(ngModel)]="selectedShipping" class="w-4 h-4 text-primary" />
                    <div class="ml-3">
                      <div class="font-semibold text-foreground">{{ method.name }}</div>
                      <div class="text-sm text-muted-foreground">{{ method.time }}</div>
                    </div>
                  </div>
                  <div class="font-semibold text-foreground">\${{ method.price }}</div>
                </label>
              </div>
              <div class="flex space-x-4 mt-6">
                <button (click)="prevStep()" class="btn-outline flex-1">Back</button>
                <button (click)="nextStep()" class="btn-primary flex-1">Continue to Payment</button>
              </div>
            </div>

            <!-- Step 3: Payment -->
            <div *ngIf="step === 3" class="card p-6">
              <h2 class="text-xl font-semibold text-foreground mb-6">Payment Details</h2>
              <div class="space-y-4">
                <input type="text" placeholder="Card Number" class="input" />
                <div class="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" class="input" />
                  <input type="text" placeholder="CVV" class="input" />
                </div>
                <input type="text" placeholder="Cardholder Name" class="input" />
              </div>
              <div class="flex space-x-4 mt-6">
                <button (click)="prevStep()" class="btn-outline flex-1">Back</button>
                <button (click)="nextStep()" class="btn-primary flex-1">Review Order</button>
              </div>
            </div>

            <!-- Step 4: Review -->
            <div *ngIf="step === 4" class="card p-6">
              <h2 class="text-xl font-semibold text-foreground mb-6">Review Order</h2>
              <div class="space-y-6">
                <div>
                  <h3 class="font-semibold text-foreground mb-2">Shipping Address</h3>
                  <p class="text-sm text-muted-foreground">
                    {{ shippingInfo.firstName }} {{ shippingInfo.lastName }}<br/>
                    {{ shippingInfo.company }}<br/>
                    {{ shippingInfo.address1 }}<br/>
                    {{ shippingInfo.city }}, {{ shippingInfo.state }} {{ shippingInfo.zip }}
                  </p>
                </div>
                <div>
                  <h3 class="font-semibold text-foreground mb-2">Shipping Method</h3>
                  <p class="text-sm text-muted-foreground">
                    {{ getSelectedShippingMethod()?.name }} - \${{ getSelectedShippingMethod()?.price }}
                  </p>
                </div>
              </div>
              <div class="flex space-x-4 mt-6">
                <button (click)="prevStep()" class="btn-outline flex-1">Back</button>
                <button (click)="placeOrder()" class="btn-primary flex-1">Place Order</button>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-20">
              <h2 class="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Subtotal</span>
                  <span class="font-semibold text-foreground">\${{ subtotal.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Tax</span>
                  <span class="font-semibold text-foreground">\${{ tax.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Shipping</span>
                  <span class="font-semibold text-foreground">\${{ shipping }}</span>
                </div>
              </div>
              <div class="border-t border-border pt-4">
                <div class="flex justify-between text-lg">
                  <span class="font-semibold text-foreground">Total</span>
                  <span class="font-bold text-foreground text-2xl">\${{ (subtotal + tax + shipping).toLocaleString() }}</span>
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
export class CheckoutComponent implements OnInit {
  step = 1;
  steps = ['Shipping', 'Method', 'Payment', 'Review'];
  subtotal = 0;
  tax = 0;
  shipping = 0;
  
  shippingInfo = {
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA'
  };

  shippingMethods = [
    { id: 1, name: 'Standard Shipping', time: '5-7 business days', price: 125 },
    { id: 2, name: 'Express Shipping', time: '2-3 business days', price: 225 },
    { id: 3, name: 'Next Day', time: '1 business day', price: 425 }
  ];

  selectedShipping = 1;

  constructor(
    private cartService: CartService,
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subtotal = this.cartService.getSubtotal();
    this.tax = this.cartService.getTax();
    this.shipping = this.shippingMethods[0].price;
  }

  nextStep(): void {
    if (this.step < 4) this.step++;
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  getSelectedShippingMethod() {
    return this.shippingMethods.find(m => m.id === this.selectedShipping);
  }

  placeOrder(): void {
    const method = this.getSelectedShippingMethod();
    this.shipping = method ? method.price : 0;
    this.mockDataService.createOrder([], this.subtotal, this.tax, this.shipping);
    this.cartService.clearCart();
    this.router.navigate(['/orders']);
  }
}
