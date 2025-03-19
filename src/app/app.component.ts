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
    <picture class="absolute inset-0 -z-10">
      <source media="(min-width: 800px)" srcset="bg-sidebar-mobile.svg" />
      <source media="(min-width: 480px)" srcset="bg-sidebar-desktop.svg" />
      <img
        src="assets/images/bg-sidebar-mobile.svg"
        alt="Description of the image"
        class="w-full -z-10"
      />
    </picture>

    <div class="flex flex-col items-center p-6 gap-6">
      <!-- Stepper -->
      <nas-stepper [currentStep]="currentStep" [maxStep]="4" />
      <!-- CurrentStep -->
      <nas-personal-info />
      <!-- <router-outlet /> -->

      <!-- Navigation -->
      <nav class="flex justify-between">
        <nas-back-button />
        <nas-next-button />
      </nav>
    </div>
  `
})
export class AppComponent {
  currentStep: number = 1;
}
