import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/types';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-background">
      <div class="bg-card border-b border-border">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center space-x-2 text-sm text-muted-foreground">
            <a routerLink="/" class="hover:text-foreground">Home</a>
            <span>/</span>
            <span class="text-foreground">Pricing</span>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-foreground mb-2">Dealer Pricing</h1>
          <p class="text-muted-foreground">Your personalized pricing based on dealer tier and volume</p>
        </div>

        <!-- Pricing Tier Card -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-foreground">Current Tier</h3>
              <span class="badge bg-primary text-white px-3 py-1">Premium</span>
            </div>
            <div class="text-3xl font-bold text-foreground mb-2">Tier 3</div>
            <p class="text-sm text-muted-foreground mb-4">Volume: $250K+ annually</p>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Base Discount:</span>
                <span class="font-semibold text-success">15%</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Volume Bonus:</span>
                <span class="font-semibold text-success">+3%</span>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-lg font-semibold text-foreground mb-4">YTD Performance</h3>
            <div class="text-3xl font-bold text-foreground mb-2">\$284,500</div>
            <p class="text-sm text-muted-foreground mb-4">Total purchases this year</p>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Next Tier:</span>
                <span class="font-semibold text-foreground">\$65,500 away</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Potential Discount:</span>
                <span class="font-semibold text-info">20%</span>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-lg font-semibold text-foreground mb-4">Special Programs</h3>
            <div class="space-y-3">
              <div class="flex items-start space-x-2">
                <svg class="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <div>
                  <div class="text-sm font-semibold text-foreground">Q1 Rebate Program</div>
                  <div class="text-xs text-muted-foreground">Eligible for 2% rebate</div>
                </div>
              </div>
              <div class="flex items-start space-x-2">
                <svg class="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <div>
                  <div class="text-sm font-semibold text-foreground">Early Payment Discount</div>
                  <div class="text-xs text-muted-foreground">1% for Net 10 payment</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Price List Table -->
        <div class="card p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-semibold text-foreground">Price List</h2>
            <div class="flex items-center space-x-4">
              <input
                type="search"
                [(ngModel)]="searchQuery"
                (ngModelChange)="filterProducts()"
                placeholder="Search by SKU or name..."
                class="input w-64"
              />
              <select [(ngModel)]="categoryFilter" (ngModelChange)="filterProducts()" class="input w-48">
                <option value="">All Categories</option>
                <option value="Carpet Tile">Carpet Tile</option>
                <option value="Hardwood">Hardwood</option>
                <option value="Vinyl">Vinyl</option>
                <option value="Laminate">Laminate</option>
                <option value="Ceramic Tile">Ceramic Tile</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-muted">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">SKU</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">Product</th>
                  <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold text-foreground">List Price</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold text-foreground">Your Price</th>
                  <th class="px-4 py-3 text-right text-sm font-semibold text-foreground">Savings</th>
                  <th class="px-4 py-3 text-center text-sm font-semibold text-foreground">Stock</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr *ngFor="let product of filteredProducts" class="hover:bg-muted/30 transition-colors">
                  <td class="px-4 py-3 text-sm font-mono text-muted-foreground">{{ product.sku }}</td>
                  <td class="px-4 py-3">
                    <div class="font-medium text-foreground">{{ product.name }}</div>
                    <div class="text-xs text-muted-foreground">{{ product.collection }}</div>
                  </td>
                  <td class="px-4 py-3 text-sm text-muted-foreground">{{ product.type }}</td>
                  <td class="px-4 py-3 text-right text-sm text-muted-foreground line-through">\${{ (product.price * 1.18).toFixed(2) }}</td>
                  <td class="px-4 py-3 text-right text-lg font-bold text-foreground">\${{ product.price.toLocaleString() }}</td>
                  <td class="px-4 py-3 text-right">
                    <span class="text-sm font-semibold text-success">18% off</span>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span [ngClass]="product.inStock ? 'badge-success' : 'badge-error'">
                      {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div *ngIf="filteredProducts.length === 0" class="text-center py-12">
            <p class="text-muted-foreground">No products found matching your criteria</p>
          </div>
        </div>

        <!-- Export Options -->
        <div class="mt-6 flex justify-end space-x-4">
          <button class="btn-outline">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export as CSV
          </button>
          <button class="btn-outline">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PricingComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery = '';
  categoryFilter = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
  }

  filterProducts(): void {
    let filtered = [...this.products];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
      );
    }

    if (this.categoryFilter) {
      filtered = filtered.filter(p => p.type === this.categoryFilter);
    }

    this.filteredProducts = filtered;
  }
}
