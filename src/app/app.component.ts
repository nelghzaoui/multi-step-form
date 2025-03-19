import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BackButtonComponent,
  NextButtonComponent,
  StepperComponent
} from './shared';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    StepperComponent,
    BackButtonComponent,
    NextButtonComponent
  ],
  template: `
    <header></header>

    <main>
      <!-- Stepper -->
      <router-outlet />
      <!-- Navigation -->
    </main>

    <footer></footer>
  `
})
export class AppComponent {
  title = 'multi-form-step';
}
