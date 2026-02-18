import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AiChatAssistantComponent } from './components/ai-chat-assistant/ai-chat-assistant.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AiChatAssistantComponent],
  template: `
    <div class="min-h-screen bg-background">
      <app-header />
      <main class="lg:pl-64">
        <router-outlet />
      </main>
      <app-ai-chat-assistant />
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Mohawk Xchange';
}
