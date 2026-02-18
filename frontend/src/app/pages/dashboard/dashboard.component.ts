import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-background">
      <!-- AI Assistant Banner -->
      <div class="bg-gradient-to-r from-card via-muted/20 to-card border-b border-border">
        <div class="container mx-auto px-4 py-8">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-foreground">How can I help you today, {{ user.name.split(' ')[0] }}?</h1>
            </div>
          </div>

          <!-- Quick Actions Pills -->
          <div class="flex flex-wrap gap-3">
            <button class="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-full text-sm transition-colors flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Check status of order #88219</span>
            </button>
            <button class="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-full text-sm transition-colors flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Find vinyl in stock under $50/sqft</span>
            </button>
            <button class="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-full text-sm transition-colors flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Show me Q3 Rebate report</span>
            </button>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="card p-6 bg-gradient-to-br from-card to-muted/20">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <div class="text-3xl font-bold text-foreground mb-1">{{ stats.totalOrders }}</div>
            <div class="text-sm text-muted-foreground mb-2">Total Orders</div>
            <div class="flex items-center text-sm">
              <span class="text-success">↑ {{ stats.totalOrdersChange }}%</span>
              <span class="text-muted-foreground ml-2">vs. last month</span>
            </div>
          </div>

          <div class="card p-6 bg-gradient-to-br from-card to-muted/20">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="text-3xl font-bold text-foreground mb-1">\${{ stats.totalSpend.toLocaleString() }}</div>
            <div class="text-sm text-muted-foreground mb-2">Total Spend</div>
            <div class="flex items-center text-sm">
              <span class="text-success">↑ {{ stats.totalSpendChange }}%</span>
              <span class="text-muted-foreground ml-2">vs. last month</span>
            </div>
          </div>

          <div class="card p-6 bg-gradient-to-br from-card to-muted/20">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div class="text-3xl font-bold text-foreground mb-1">{{ stats.openClaims }}</div>
            <div class="text-sm text-muted-foreground mb-2">Open Claims</div>
            <div class="flex items-center text-sm">
              <span class="text-success">↓ {{ Math.abs(stats.openClaimsChange) }}%</span>
              <span class="text-muted-foreground ml-2">vs. last month</span>
            </div>
          </div>

          <div class="card p-6 bg-gradient-to-br from-card to-muted/20">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div class="text-3xl font-bold text-foreground mb-1">{{ stats.activeQuotes }}</div>
            <div class="text-sm text-muted-foreground mb-2">Active Quotes</div>
            <div class="flex items-center text-sm">
              <span class="text-success">↑ {{ stats.activeQuotesChange }}%</span>
              <span class="text-muted-foreground ml-2">vs. last month</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-foreground mb-6">Quick Actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a routerLink="/products" class="card-hover p-6 group cursor-pointer">
              <div class="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-foreground mb-2">Browse Products</h3>
              <p class="text-sm text-muted-foreground">Explore our full catalog</p>
            </a>

            <div class="card-hover p-6 group cursor-pointer">
              <div class="w-14 h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-foreground mb-2">Quick Order</h3>
              <p class="text-sm text-muted-foreground">Add items by SKU</p>
            </div>

            <div class="card-hover p-6 group cursor-pointer">
              <div class="w-14 h-14 bg-gradient-to-br from-warning to-warning/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-foreground mb-2">Submit Claim</h3>
              <p class="text-sm text-muted-foreground">File a new claim</p>
            </div>

            <div class="card-hover p-6 group cursor-pointer">
              <div class="w-14 h-14 bg-gradient-to-br from-success to-success/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-foreground mb-2">Request Quote</h3>
              <p class="text-sm text-muted-foreground">Get pricing estimate</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Spend Analyzer -->
          <div class="lg:col-span-2 card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-foreground">Spend Analyzer</h2>
              <select class="px-3 py-1 text-sm bg-muted border border-border rounded-lg text-foreground">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>This Year</option>
              </select>
            </div>
            
            <div class="h-64 flex items-end justify-between space-x-2 mb-6">
              <div *ngFor="let data of spendData" class="flex-1 flex flex-col items-center">
                <div class="w-full bg-primary rounded-t-lg transition-all hover:opacity-80" 
                     [style.height.%]="(data.amount / 52000) * 100">
                </div>
                <div class="text-xs text-muted-foreground mt-2">{{ data.month }}</div>
              </div>
            </div>

            <div class="border-t border-border pt-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-foreground mb-1">AI Spend Insight</h3>
                  <p class="text-sm text-muted-foreground mb-2">
                    "Your procurement has increased by 18% compared to last quarter. Top category: Carpet Tiles (45% of total spend)."
                  </p>
                  <div class="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div>
                      <span class="font-semibold text-foreground">TOP CATEGORY:</span> Carpet Tiles
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="card p-6">
            <h2 class="text-xl font-semibold text-foreground mb-6">Recent Orders</h2>
            <div class="space-y-4">
              <div *ngFor="let order of recentOrders" class="pb-4 border-b border-border last:border-0 last:pb-0">
                <div class="flex items-center justify-between mb-2">
                  <div class="font-semibold text-foreground">{{ order.orderNumber }}</div>
                  <span [ngClass]="{
                    'badge-info': order.status === 'In Transit',
                    'badge-warning': order.status === 'Processing',
                    'badge-success': order.status === 'Delivered'
                  }">
                    {{ order.status }}
                  </span>
                </div>
                <div class="text-sm text-muted-foreground mb-1">{{ order.shipTo }}</div>
                <div class="text-sm font-semibold text-foreground">\${{ order.total.toLocaleString() }}</div>
              </div>
            </div>
            <a routerLink="/orders" class="btn-outline w-full mt-6">View All Orders</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  user: any;
  stats: any;
  spendData: any[] = [];
  recentOrders: any[] = [];
  Math = Math;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.user = this.mockDataService.getUser();
    this.stats = this.mockDataService.getDashboardStats();
    this.spendData = this.mockDataService.getSpendData();
    this.recentOrders = this.mockDataService.getOrders().slice(0, 4);
  }
}
