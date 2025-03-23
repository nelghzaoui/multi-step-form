import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BackButtonComponent,
  NextButtonComponent,
  StepperComponent
} from './shared';
import { PersonalInfoComponent } from './components/personal-info.component';
import { PlansComponent } from './components/plans.component';
import { AddOnsComponent } from './components/add-ons.component';
import { SummaryComponent } from './components/summary.component';
import { CompleteComponent } from './components/complete.component';
import { PersonnalInfo } from './models/personal-info.interface';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-root',
  imports: [
    StepperComponent,
    PersonalInfoComponent,
    PlansComponent,
    BackButtonComponent,
    NextButtonComponent,
    AddOnsComponent,
    SummaryComponent,
    CompleteComponent
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
          @switch (currentStep) { @case (1) {
          <nas-personal-info
            (validated)="setFormValidity($event)"
            (values)="setFormValues($event)"
          />
          } @case (2) {
          <nas-plans (selected)="enableNext($event)" />
          } @case (3) {
          <nas-add-ons (selected)="enableNext($event)" />
          } @case (4) {
          <nas-summary />
          } @case (5) {
          <nas-complete />
          } }
        </div>

        <!-- Navigation -->
        @if(currentStep < 5) {
        <nav class="bg-white p-5 flex justify-between shadow-2xl">
          @if(currentStep > 1) {
          <nas-back-button (clicked)="previousStep()" />
          }
          <nas-next-button
            [isDisable]="!isNextEnable"
            (clicked)="nextStep()"
            class="ml-auto"
          />
        </nav>
        }
      </div>
    </main>
  `
})
export class AppComponent {
  private readonly formService = inject(FormService);
  currentStep: number = 3;
  errorMessage: string = '';
  isNextEnable: boolean = false;

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nextStep() {
    this.currentStep++;
  }

  enableNext(value: boolean) {
    this.isNextEnable = value;
  }

  setFormValidity(value: boolean) {
    this.isNextEnable = !value;
  }

  setFormValues(values: PersonnalInfo) {
    this.formService.validateInfoStep(values);
  }
}
