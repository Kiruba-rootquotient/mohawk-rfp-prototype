import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/types';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Breadcrumb -->
      <div class="bg-card border-b border-border">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center space-x-2 text-sm text-muted-foreground">
            <a routerLink="/" class="hover:text-foreground">Home</a>
            <span>/</span>
            <span class="text-foreground">Products</span>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div class="mb-6">
          <h1 class="text-4xl font-bold text-foreground mb-2">Browse Products</h1>
          <p class="text-muted-foreground">Discover our premium flooring collection</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Filter Sidebar -->
          <aside class="lg:w-64 flex-shrink-0">
            <div class="card p-6 sticky top-20">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-semibold text-foreground">Filters</h2>
                <button (click)="clearFilters()" class="text-sm text-primary hover:underline">Clear all</button>
              </div>

              <!-- Search -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-foreground mb-2">Search</label>
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  (ngModelChange)="applyFilters()"
                  placeholder="Search products..."
                  class="input"
                />
              </div>

              <!-- Product Type -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-foreground mb-3">Product Type</label>
                <div class="space-y-2">
                  <label *ngFor="let type of productTypes" class="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      [value]="type"
                      [checked]="selectedTypes.includes(type)"
                      (change)="toggleType(type)"
                      class="w-4 h-4 text-primary bg-muted border-border rounded focus:ring-2 focus:ring-primary"
                    />
                    <span class="ml-3 text-sm text-muted-foreground group-hover:text-foreground">{{ type }}</span>
                  </label>
                </div>
              </div>

              <!-- Availability -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-foreground mb-3">Availability</label>
                <label class="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    [(ngModel)]="inStockOnly"
                    (ngModelChange)="applyFilters()"
                    class="w-4 h-4 text-primary bg-muted border-border rounded focus:ring-2 focus:ring-primary"
                  />
                  <span class="ml-3 text-sm text-muted-foreground group-hover:text-foreground">In Stock Only</span>
                </label>
              </div>

              <!-- Price Range -->
              <div>
                <label class="block text-sm font-medium text-foreground mb-3">Price Range</label>
                <div class="space-y-2">
                  <input
                    type="number"
                    [(ngModel)]="priceMin"
                    (ngModelChange)="applyFilters()"
                    placeholder="Min"
                    class="input"
                  />
                  <input
                    type="number"
                    [(ngModel)]="priceMax"
                    (ngModelChange)="applyFilters()"
                    placeholder="Max"
                    class="input"
                  />
                </div>
              </div>
            </div>
          </aside>

          <!-- Product Grid -->
          <main class="flex-1">
            <div class="flex items-center justify-between mb-6">
              <div class="text-sm text-muted-foreground">
                {{ filteredProducts.length }} Products Found
              </div>
              <select [(ngModel)]="sortBy" (ngModelChange)="sortProducts()" class="px-3 py-2 text-sm bg-muted border border-border rounded-lg text-foreground">
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div *ngFor="let product of filteredProducts" class="card-hover group cursor-pointer" [routerLink]="['/product', product.id]">
                <!-- Product Image -->
                <div class="relative aspect-square overflow-hidden rounded-t-xl">
                  <img [src]="product.image" [alt]="product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  
                  <!-- Badges -->
                  <div class="absolute top-3 left-3 flex flex-col gap-2">
                    <span *ngIf="product.badge === 'Best Seller'" class="badge bg-primary text-white px-3 py-1">Best Seller</span>
                    <span *ngIf="product.badge === 'Trending'" class="badge bg-warning text-white px-3 py-1">Trending</span>
                    <span *ngIf="product.badge === 'New'" class="badge bg-success text-white px-3 py-1">New</span>
                    <span *ngIf="product.badge === 'Limited Stock'" class="badge bg-error text-white px-3 py-1">Limited Stock</span>
                  </div>

                  <!-- Stock Status -->
                  <div class="absolute top-3 right-3">
                    <span [ngClass]="product.inStock ? 'badge-success' : 'badge-error'">{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</span>
                  </div>
                </div>

                <!-- Product Info -->
                <div class="p-5">
                  <div class="text-xs text-muted-foreground mb-1">{{ product.sku }}</div>
                  <h3 class="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{{ product.name }}</h3>
                  <div class="text-sm text-muted-foreground mb-3">{{ product.type }}</div>
                  
                  <!-- Rating -->
                  <div class="flex items-center mb-3">
                    <div class="flex items-center">
                      <svg *ngFor="let star of [1,2,3,4,5]" class="w-4 h-4" [ngClass]="star <= product.rating ? 'text-warning' : 'text-muted'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="ml-2 text-sm text-foreground font-medium">{{ product.rating }}</span>
                      <span class="ml-1 text-sm text-muted-foreground">({{ product.reviewCount }})</span>
                    </div>
                  </div>

                  <div class="text-sm text-muted-foreground mb-4">{{ product.colors }} Colors Available</div>

                  <!-- Price -->
                  <div class="flex items-baseline justify-between mb-4">
                    <div>
                      <div class="text-2xl font-bold text-foreground">\${{ product.price.toLocaleString() }}</div>
                      <div class="text-xs text-muted-foreground">\${{ product.pricePerBox.toFixed(2) }} / box</div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <button
                    (click)="addToCart(product, $event)"
                    [disabled]="!product.inStock"
                    class="btn-primary w-full"
                  >
                    {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
                  </button>
                </div>
              </div>
            </div>

            <div *ngIf="filteredProducts.length === 0" class="text-center py-20">
              <svg class="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 class="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p class="text-muted-foreground">Try adjusting your filters</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  // Filters
  searchQuery = '';
  selectedTypes: string[] = [];
  inStockOnly = false;
  priceMin: number | null = null;
  priceMax: number | null = null;
  sortBy = 'featured';

  productTypes = ['Carpet Tile', 'Hardwood', 'Vinyl', 'Laminate', 'Ceramic Tile'];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
  }

  toggleType(type: string): void {
    const index = this.selectedTypes.indexOf(type);
    if (index > -1) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Search
    if (this.searchQuery) {
      filtered = this.productService.searchProducts(this.searchQuery);
    }

    // Type filter
    if (this.selectedTypes.length > 0) {
      filtered = filtered.filter(p => this.selectedTypes.includes(p.type));
    }

    // Stock filter
    if (this.inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Price filter
    if (this.priceMin !== null || this.priceMax !== null) {
      filtered = filtered.filter(p => {
        const min = this.priceMin ?? 0;
        const max = this.priceMax ?? Infinity;
        return p.price >= min && p.price <= max;
      });
    }

    this.filteredProducts = filtered;
    this.sortProducts();
  }

  sortProducts(): void {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedTypes = [];
    this.inStockOnly = false;
    this.priceMin = null;
    this.priceMax = null;
    this.sortBy = 'featured';
    this.applyFilters();
  }

  addToCart(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (product.inStock) {
      this.cartService.addToCart(product, 1);
    }
  }
}
