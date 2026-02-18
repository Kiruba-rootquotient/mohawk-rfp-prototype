import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex">
      <!-- Left Side - Hero Image -->
      <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200" 
             alt="Premium Flooring" 
             class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent"></div>
        <div class="relative z-10 flex flex-col justify-end p-12">
          <h2 class="text-4xl font-bold text-white mb-4">
            Built for the complexity of flooring.
            <br/>
            Designed for the speed of business.
          </h2>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="flex-1 flex items-center justify-center p-8 bg-background">
        <div class="w-full max-w-md space-y-8">
          <!-- Logo -->
          <div class="flex flex-col items-center">
            <div class="text-3xl font-bold text-primary mb-2">MOHAWK</div>
            <div class="text-sm text-muted-foreground">Xchange</div>
          </div>

          <div class="card p-8">
            <h2 class="text-2xl font-bold text-foreground mb-2">Login with Email</h2>
            <p class="text-sm text-muted-foreground mb-6">Access your dealer account</p>

            <form (ngSubmit)="login()" class="space-y-4">
              <!-- Email Input -->
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">
                  Username or email address
                </label>
                <div class="relative">
                  <svg class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    [(ngModel)]="email"
                    name="email"
                    class="input pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <!-- Password Input -->
              <div>
                <label class="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div class="relative">
                  <svg class="absolute left-3 top-3 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    [(ngModel)]="password"
                    name="password"
                    class="input pl-10"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input type="checkbox" class="w-4 h-4 text-primary bg-muted border-border rounded" />
                  <label class="ml-2 text-sm text-muted-foreground">Remember me</label>
                </div>
                <a href="#" class="text-sm text-primary hover:underline">Forgot Password?</a>
              </div>

              <button type="submit" class="btn-primary w-full">
                Get Started
                <svg class="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>

            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-border"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <button class="btn-outline w-full mt-4">
                <svg class="w-5 h-5 mr-2" viewBox="0 0 21 21" fill="none">
                  <rect x="1" y="1" width="19" height="19" fill="#F25022"/>
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
                </svg>
                Continue with Microsoft
              </button>
            </div>

            <p class="mt-6 text-center text-sm text-muted-foreground">
              New to Mohawk Xchange?
              <a href="#" class="text-primary font-semibold hover:underline ml-1">Create Your Account</a>
            </p>
          </div>

          <!-- Footer -->
          <div class="text-center text-xs text-muted-foreground">
            <p class="mb-2">Copyright © 2026 Mohawk Industries. All rights reserved.</p>
            <div class="flex justify-center space-x-3">
              <a href="#" class="hover:text-foreground">Legal</a>
              <span>|</span>
              <a href="#" class="hover:text-foreground">Terms and Conditions</a>
              <span>|</span>
              <a href="#" class="hover:text-foreground">Privacy Policy</a>
              <span>|</span>
              <a href="#" class="hover:text-foreground">Contact us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login(): void {
    // Mock login - redirect to dashboard
    this.router.navigate(['/']);
  }
}
