import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/types';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-background" *ngIf="product">
      <div class="bg-card border-b border-border">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center space-x-2 text-sm text-muted-foreground">
            <a routerLink="/" class="hover:text-foreground">Home</a>
            <span>/</span>
            <a routerLink="/products" class="hover:text-foreground">Products</a>
            <span>/</span>
            <span class="text-foreground">{{ product.name }}</span>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div class="aspect-square rounded-xl overflow-hidden border border-border">
              <img [src]="product.image" [alt]="product.name" class="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <div class="text-sm text-muted-foreground mb-2">{{ product.sku }}</div>
            <h1 class="text-4xl font-bold text-foreground mb-4">{{ product.name }}</h1>
            <div class="text-lg text-muted-foreground mb-6">{{ product.type }} - {{ product.collection }}</div>

            <div class="flex items-center mb-6">
              <div class="flex items-center">
                <svg *ngFor="let star of [1,2,3,4,5]" class="w-5 h-5" [ngClass]="star <= product.rating ? 'text-warning' : 'text-muted'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="ml-3 text-lg font-semibold text-foreground">{{ product.rating }}</span>
                <span class="ml-2 text-muted-foreground">({{ product.reviewCount }} reviews)</span>
              </div>
            </div>

            <p class="text-muted-foreground mb-8">{{ product.description }}</p>

            <div class="border-t border-b border-border py-6 mb-6">
              <div class="text-4xl font-bold text-foreground mb-2">\${{ product.price.toLocaleString() }}</div>
              <div class="text-muted-foreground">\${{ product.pricePerBox.toFixed(2) }} per box - {{ product.boxSize }}</div>
            </div>

            <div class="flex items-center space-x-4 mb-8">
              <span [ngClass]="product.inStock ? 'badge-success' : 'badge-error' " class="text-base px-4 py-2">
                {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
              </span>
              <span *ngIf="product.inStock && product.stockCount" class="text-sm text-muted-foreground">
                {{ product.stockCount }} units available
              </span>
            </div>

            <div class="flex space-x-4 mb-8">
              <button (click)="addToCart()" [disabled]="!product.inStock" class="btn-primary flex-1">
                Add to Cart
              </button>
              <button class="btn-outline">Order Sample</button>
            </div>

            <div class="card p-6">
              <h3 class="text-lg font-semibold text-foreground mb-4">Specifications</h3>
              <div class="space-y-3">
                <div *ngFor="let spec of getSpecifications()" class="flex justify-between">
                  <span class="text-muted-foreground">{{ spec.label }}</span>
                  <span class="text-foreground font-medium">{{ spec.value }}</span>
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
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product = this.productService.getProductById(id);
    }
  }

  addToCart(): void {
    if (this.product && this.product.inStock) {
      this.cartService.addToCart(this.product, 1);
    }
  }

  getSpecifications(): Array<{label: string, value: string}> {
    if (!this.product) return [];
    const specs = this.product.specifications;
    return [
      { label: 'Size', value: specs.size },
      { label: 'Warranty', value: specs.warranty || 'N/A' },
      { label: 'Installation', value: specs.installation || 'N/A' },
      { label: 'Fiber Type', value: specs.fiberType || 'N/A' },
      { label: 'Backing Type', value: specs.backingType || 'N/A' }
    ].filter(spec => spec.value !== 'N/A');
  }
}
