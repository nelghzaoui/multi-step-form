import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BackButtonComponent,
  NextButtonComponent,
  StepperComponent
} from './shared';
import { PersonalInfoComponent } from './components/personal-info.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    StepperComponent,
    PersonalInfoComponent,
    BackButtonComponent,
    NextButtonComponent
  ],
  template: `
    <main class="relative min-h-screen bg-magnolia">
      <picture class="absolute inset-0 z-1">
        <source media="(min-width: 800px)" srcset="bg-sidebar-mobile.svg" />
        <source media="(min-width: 480px)" srcset="bg-sidebar-desktop.svg" />
        <img
          src="assets/images/bg-sidebar-mobile.svg"
          alt="Description of the image"
          class="w-full object-contain"
        />
      </picture>

      <!-- Contenu principal positionné au-dessus grâce à relative et z-index -->
      <div class="relative z-10 flex flex-col justify-between min-h-screen">
        <div class="flex flex-col items-center p-6 gap-11">
          <!-- Stepper -->
          <nas-stepper [currentStep]="currentStep" [maxStep]="4" />
          <!-- CurrentStep -->
          <nas-personal-info />
        </div>

        <!-- Navigation -->
        <nav class="bg-white p-5 flex justify-between shadow-2xl">
          <nas-back-button />
          <nas-next-button />
        </nav>
      </div>
    </main>
  `
})
export class AppComponent {
  currentStep: number = 1;
}
