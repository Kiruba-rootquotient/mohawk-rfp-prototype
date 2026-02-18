import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  message: string;
  timestamp: Date;
  type?: 'text' | 'card';
  cardData?: any;
}

@Component({
  selector: 'app-ai-chat-assistant',
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Chat Trigger Button -->
    <button *ngIf="!isOpen" 
            (click)="toggleChat()"
            class="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary hover:bg-primary/90 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110">
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <span class="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></span>
    </button>

    <!-- Chat Widget -->
    <div *ngIf="isOpen" class="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 to-primary/5">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card"></span>
          </div>
          <div>
            <div class="text-sm font-semibold text-foreground">Voicelet Assistant</div>
            <div class="text-xs text-success flex items-center space-x-1">
              <span class="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
              <span>Online & Ready</span>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button (click)="minimizeChat()" class="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </button>
          <button (click)="closeChat()" class="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" #messagesContainer>
        <!-- Welcome Message -->
        <div *ngIf="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-foreground mb-2">Hi! I'm Voicelet</h3>
          <p class="text-sm text-muted-foreground max-w-xs">I'm here to help you with orders, products, and anything else you need!</p>
        </div>

        <!-- Chat Messages -->
        <div *ngFor="let msg of messages" [class]="msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'">
          <!-- User Message -->
          <div *ngIf="msg.sender === 'user'" class="max-w-[75%]">
            <div class="bg-muted px-4 py-2.5 rounded-2xl rounded-tr-sm">
              <p class="text-sm text-foreground">{{ msg.message }}</p>
            </div>
            <div class="text-xs text-muted-foreground mt-1 text-right">{{ formatTime(msg.timestamp) }}</div>
          </div>

          <!-- Assistant Message -->
          <div *ngIf="msg.sender === 'assistant'" class="max-w-[85%]">
            <!-- Text Message -->
            <div *ngIf="msg.type === 'text'" class="bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-2xl rounded-tl-sm">
              <p class="text-sm text-foreground">{{ msg.message }}</p>
            </div>

            <!-- Card Message -->
            <div *ngIf="msg.type === 'card' && msg.cardData" class="bg-muted/50 border border-border rounded-xl p-4">
              <div class="flex items-start space-x-3 mb-3">
                <div class="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-sm font-semibold text-foreground mb-1">{{ msg.cardData.title }}</h4>
                  <p class="text-xs text-muted-foreground">{{ msg.cardData.subtitle }}</p>
                </div>
              </div>
              
              <div class="space-y-2 mb-3">
                <div class="flex justify-between text-xs">
                  <span class="text-muted-foreground">Status:</span>
                  <span class="text-warning font-semibold">{{ msg.cardData.status }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-muted-foreground">Expected:</span>
                  <span class="text-foreground">{{ msg.cardData.date }}</span>
                </div>
              </div>

              <div class="flex space-x-2">
                <button class="flex-1 px-3 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>Track Shipment</span>
                </button>
                <button class="flex-1 px-3 py-2 bg-muted text-foreground text-xs font-medium rounded-lg hover:bg-muted/80 transition-colors flex items-center justify-center space-x-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email</span>
                </button>
              </div>
            </div>

            <div class="text-xs text-muted-foreground mt-1">{{ formatTime(msg.timestamp) }}</div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div *ngIf="isTyping" class="flex justify-start">
          <div class="bg-primary/10 border border-primary/20 px-4 py-3 rounded-2xl rounded-tl-sm">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Suggestions (when no messages) -->
      <div *ngIf="messages.length === 0" class="px-4 pb-4">
        <div class="text-xs text-muted-foreground mb-2">Quick suggestions:</div>
        <div class="space-y-2">
          <button (click)="sendQuickMessage('Check status of order #88219')" 
                  class="w-full text-left px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs text-foreground transition-colors">
            📦 Check status of order #88219
          </button>
          <button (click)="sendQuickMessage('Find vinyl in stock under $50/sqft')" 
                  class="w-full text-left px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs text-foreground transition-colors">
            🔍 Find vinyl in stock under $50/sqft
          </button>
          <button (click)="sendQuickMessage('Show me Q3 Rebate report')" 
                  class="w-full text-left px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-xs text-foreground transition-colors">
            📊 Show me Q3 Rebate report
          </button>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t border-border">
        <div class="flex items-center space-x-2">
          <div class="flex-1 relative">
            <input
              type="text"
              [(ngModel)]="userInput"
              (keyup.enter)="sendMessage()"
              placeholder="Type or ask anything..."
              class="w-full px-4 py-2.5 pr-10 bg-muted border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-background rounded-full transition-colors">
              <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
          <button (click)="sendMessage()" 
                  [disabled]="!userInput.trim()"
                  class="w-10 h-10 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AiChatAssistantComponent {
  isOpen = false;
  isTyping = false;
  userInput = '';
  messages: ChatMessage[] = [];

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  closeChat(): void {
    this.isOpen = false;
  }

  minimizeChat(): void {
    this.isOpen = false;
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    // Add user message
    this.messages.push({
      id: Date.now().toString(),
      sender: 'user',
      message: this.userInput,
      timestamp: new Date(),
      type: 'text'
    });

    const query = this.userInput.toLowerCase();
    this.userInput = '';

    // Simulate assistant response
    this.isTyping = true;
    setTimeout(() => {
      this.isTyping = false;

      if (query.includes('order') || query.includes('88219')) {
        // Send card message
        this.messages.push({
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          message: '',
          timestamp: new Date(),
          type: 'card',
          cardData: {
            title: 'Order #88219',
            subtitle: 'PO #8821 - Shipped to Chicago, IL',
            status: 'In Transit',
            date: 'Jan 20, 2024'
          }
        });
      } else if (query.includes('vinyl') || query.includes('stock')) {
        this.messages.push({
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          message: 'I found 12 vinyl products in stock under $50/sqft. Would you like to see them?',
          timestamp: new Date(),
          type: 'text'
        });
      } else if (query.includes('rebate') || query.includes('report')) {
        this.messages.push({
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          message: 'Your Q3 Rebate report shows $2,450 in eligible rebates. Would you like me to email it to you?',
          timestamp: new Date(),
          type: 'text'
        });
      } else {
        this.messages.push({
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          message: 'I can help you with orders, products, pricing, and more. What would you like to know?',
          timestamp: new Date(),
          type: 'text'
        });
      }
    }, 1500);
  }

  sendQuickMessage(message: string): void {
    this.userInput = message;
    this.sendMessage();
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
}
