import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Quote {
  id: string;
  quoteNumber: string;
  date: Date;
  status: 'Draft' | 'Pending' | 'Approved' | 'Expired';
  customerName: string;
  projectName: string;
  items: number;
  subtotal: number;
  validUntil: Date;
}

@Component({
  selector: 'app-quotes',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-background">
      <div class="bg-card border-b border-border">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center space-x-2 text-sm text-muted-foreground">
            <a routerLink="/" class="hover:text-foreground">Home</a>
            <span>/</span>
            <span class="text-foreground">Quotes</span>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-4xl font-bold text-foreground mb-2">Quote Management</h1>
            <p class="text-muted-foreground">Create and manage your product quotes</p>
          </div>
          <button class="btn-primary">
            <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Quote
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6">
            <div class="text-sm text-muted-foreground mb-2">Active Quotes</div>
            <div class="text-3xl font-bold text-foreground">12</div>
            <div class="text-sm text-success mt-2">↑ 3 from last month</div>
          </div>
          <div class="card p-6">
            <div class="text-sm text-muted-foreground mb-2">Pending Approval</div>
            <div class="text-3xl font-bold text-foreground">5</div>
            <div class="text-sm text-warning mt-2">Requires action</div>
          </div>
          <div class="card p-6">
            <div class="text-sm text-muted-foreground mb-2">Total Value</div>
            <div class="text-3xl font-bold text-foreground">\$156K</div>
            <div class="text-sm text-muted-foreground mt-2">Combined quotes</div>
          </div>
          <div class="card p-6">
            <div class="text-sm text-muted-foreground mb-2">Conversion Rate</div>
            <div class="text-3xl font-bold text-foreground">68%</div>
            <div class="text-sm text-success mt-2">↑ 5% from last quarter</div>
          </div>
        </div>

        <!-- Filters -->
        <div class="card p-4 mb-6">
          <div class="flex items-center space-x-4">
            <input
              type="search"
              [(ngModel)]="searchQuery"
              (ngModelChange)="filterQuotes()"
              placeholder="Search quotes..."
              class="input flex-1"
            />
            <select [(ngModel)]="statusFilter" (ngModelChange)="filterQuotes()" class="input w-48">
              <option value="">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Expired">Expired</option>
            </select>
            <button class="btn-outline">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              More Filters
            </button>
          </div>
        </div>

        <!-- Quotes Table -->
        <div class="card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-muted">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Quote #</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Project</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th class="px-6 py-4 text-right text-sm font-semibold text-foreground">Items</th>
                  <th class="px-6 py-4 text-right text-sm font-semibold text-foreground">Total</th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-foreground">Valid Until</th>
                  <th class="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr *ngFor="let quote of filteredQuotes" class="hover:bg-muted/30 transition-colors">
                  <td class="px-6 py-4">
                    <div class="font-semibold text-foreground">{{ quote.quoteNumber }}</div>
                    <div class="text-xs text-muted-foreground">{{ quote.customerName }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-foreground">{{ quote.projectName }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-muted-foreground">{{ quote.date | date:'MMM d, y' }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span [ngClass]="{
                      'badge bg-muted text-muted-foreground': quote.status === 'Draft',
                      'badge-warning': quote.status === 'Pending',
                      'badge-success': quote.status === 'Approved',
                      'badge-error': quote.status === 'Expired'
                    }">
                      {{ quote.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="text-sm text-foreground">{{ quote.items }} items</div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="font-semibold text-foreground">\${{ quote.subtotal.toLocaleString() }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-muted-foreground">{{ quote.validUntil | date:'MMM d, y' }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <button class="p-2 hover:bg-muted rounded-lg transition-colors" title="View">
                        <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button class="p-2 hover:bg-muted rounded-lg transition-colors" title="Edit">
                        <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button class="p-2 hover:bg-muted rounded-lg transition-colors" title="Download">
                        <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] = [
    {
      id: '1',
      quoteNumber: 'Q-2024-001',
      date: new Date('2024-01-15'),
      status: 'Approved',
      customerName: 'Premium Flooring Solutions',
      projectName: 'Downtown Office Complex',
      items: 15,
      subtotal: 45600,
      validUntil: new Date('2024-02-15')
    },
    {
      id: '2',
      quoteNumber: 'Q-2024-002',
      date: new Date('2024-01-18'),
      status: 'Pending',
      customerName: 'ABC Construction',
      projectName: 'Residential Tower Project',
      items: 22,
      subtotal: 78900,
      validUntil: new Date('2024-02-18')
    },
    {
      id: '3',
      quoteNumber: 'Q-2024-003',
      date: new Date('2024-01-20'),
      status: 'Draft',
      customerName: 'Elite Builders',
      projectName: 'Hotel Renovation',
      items: 8,
      subtotal: 12300,
      validUntil: new Date('2024-02-20')
    },
    {
      id: '4',
      quoteNumber: 'Q-2024-004',
      date: new Date('2024-01-12'),
      status: 'Expired',
      customerName: 'Metro Contractors',
      projectName: 'School District Flooring',
      items: 30,
      subtotal: 95400,
      validUntil: new Date('2024-01-31')
    },
    {
      id: '5',
      quoteNumber: 'Q-2024-005',
      date: new Date('2024-01-22'),
      status: 'Pending',
      customerName: 'Luxury Homes Inc',
      projectName: 'Luxury Condos',
      items: 18,
      subtotal: 56700,
      validUntil: new Date('2024-02-22')
    }
  ];

  filteredQuotes: Quote[] = [];
  searchQuery = '';
  statusFilter = '';

  ngOnInit(): void {
    this.filteredQuotes = [...this.quotes];
  }

  filterQuotes(): void {
    let filtered = [...this.quotes];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(q =>
        q.quoteNumber.toLowerCase().includes(query) ||
        q.projectName.toLowerCase().includes(query) ||
        q.customerName.toLowerCase().includes(query)
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter(q => q.status === this.statusFilter);
    }

    this.filteredQuotes = filtered;
  }
}
