import { Component, inject } from '@angular/core';
import {
  BackButtonComponent,
  CardComponent,
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
    CardComponent,
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
      <div class="absolute inset-0 z-1">
        <img
          src="assets/images/bg-sidebar-mobile.svg"
          alt="Description of the image"
          class="w-full object-contain lg:hidden"
        />
      </div>

      <div class="relative z-10 flex flex-col justify-between min-h-screen">
        <div class="flex flex-col items-center p-6 gap-11">
          <!-- Stepper -->
          <nas-stepper
            class="lg:hidden"
            [currentStep]="currentStep"
            [maxStep]="4"
          />
          <!-- CurrentStep -->

          <nas-card>
            <nas-stepper
              class="hidden lg:block"
              ngProjectAs="card-step"
              [currentStep]="currentStep"
              [maxStep]="4"
              [stepTitles]="titles"
            />

            @switch (currentStep) { @case (1) {
            <nas-personal-info
              ngProjectAs="card-content"
              (validated)="setFormValidity($event)"
              (values)="setFormValues($event)"
            />
            } @case (2) {
            <nas-plans (selected)="setPlan($event)" />
            } @case (3) {
            <nas-add-ons />
            } @case (4) {
            <nas-summary (changed)="onRedirect()" />
            } @case (5) {
            <nas-complete />
            } }

            <nav
              ngProjectAs="card-nav"
              class=" hidden lg:flex lg:justify-between"
            >
              @if(currentStep > 1) {
              <nas-back-button (clicked)="previousStep()" />
              }
              <nas-next-button
                [label]="currentStep === 4 ? 'Confirm' : 'Next Step'"
                [isDisable]="isNextDisable"
                (clicked)="nextStep()"
                class="ml-auto"
              />
            </nav>
          </nas-card>
        </div>

        <!-- Navigation -->
        @if(currentStep < 5) {
        <nav class="bg-white p-5 flex justify-between shadow-2xl lg:hidden">
          @if(currentStep > 1) {
          <nas-back-button (clicked)="previousStep()" />
          }
          <nas-next-button
            [label]="currentStep === 4 ? 'Confirm' : 'Next Step'"
            [isDisable]="isNextDisable"
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
  currentStep: number = 1;
  isNextDisable: boolean = true;
  titles: string[] = ['Your info', 'Select plan', 'Add-ons', 'Summary'];

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nextStep() {
    this.currentStep++;
    this.isNextDisable = false;
  }

  setFormValidity(value: boolean) {
    this.isNextDisable = !value;
  }

  setFormValues(values: PersonnalInfo) {
    this.formService.validateInfoStep(values);
  }

  setPlan(value: boolean) {
    this.isNextDisable = value;
  }

  onRedirect() {
    this.currentStep = 2;
  }
}
