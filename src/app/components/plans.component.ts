import { Component, inject, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Billing, Plan } from '../models/plan.class';
import { FormService } from '../services/form.service';

@Component({
  selector: 'nas-plans',
  imports: [CurrencyPipe, FormsModule, NgClass],
  template: `
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold text-marine lg:text-4xl">
        Select your plan
      </h1>
      <p class="text-gray font-sm lg:text-lg">
        You have the option of monthly or yearly billing.
      </p>

      <fieldset
        class="flex flex-col gap-3 lg:flex-row lg:gap-5 lg:pt-8 lg:pb-4"
        aria-labelledby="plan-label"
      >
        <legend id="plan-label" class="sr-only">Select your plan</legend>
        @for(plan of plans; track plan) {
        <label
          for="{{ plan.label }}_{{ plan.price }}"
          tabindex="0"
          class="flex cursor-pointer items-center gap-4 rounded-lg border border-light bg-white p-4 text-sm font-medium shadow-xs 
               hover:border-marine focus:outline-none focus:ring-2 focus:ring-purplish has-[:checked]:border-purplish has-[:checked]:bg-magnolia 
                 lg:flex-col lg:w-[150px] lg:max-w-3xl lg:gap-12 lg:items-start"
        >
          <input
            id="{{ plan.label }}_{{ plan.price }}"
            name="plan"
            type="radio"
            class="sr-only peer"
            [attr.aria-checked]="plan.price === selectedPlanPrice"
            [(ngModel)]="selectedPlanPrice"
            (change)="onSelectPlan(plan)"
            [value]="plan.price"
          />

          <img
            [src]="plan.iconPath"
            [alt]="plan.label + 'icon'"
            class="w-10 h-10 object-contain transition-all duration-200 peer-checked:opacity-100 peer-focus:opacity-100"
          />

          <div class="flex flex-col">
            <span
              class="text-marine font-bold transition-colors duration-200 peer-checked:text-purplish lg:text-lg"
            >
              {{ plan.label }}
            </span>
            <span class="text-gray text-sm lg:text-base">
              {{ plan.price | currency : 'USD' : 'symbol' : '1.0-0' }}/{{
                plan.billing
              }}
            </span>
          </div>
        </label>

        }
      </fieldset>

      <div
        class="flex justify-center gap-6 border border-magnolia bg-magnolia p-4 rounded-lg"
        role="group"
        aria-label="Billing options"
      >
        <span [ngClass]="{ 'text-gray': isPaidYearly }">Monthly</span>
        <label
          for="monthly"
          class="relative flex items-center gap-4 h-6 w-12 cursor-pointer rounded-full bg-marine transition [-webkit-tap-highlight-color:_transparent] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purplish"
        >
          <input
            type="checkbox"
            id="monthly"
            class="peer sr-only"
            [(ngModel)]="isPaidYearly"
            (change)="onChangeBilling()"
            [attr.aria-checked]="isPaidYearly"
            role="switch"
          />
          <span
            class="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-6"
          ></span>
        </label>
        <span [ngClass]="{ 'text-gray': !isPaidYearly }">Yearly</span>
      </div>
    </div>
  `
})
export class PlansComponent implements OnInit {
  private readonly formService = inject(FormService);
  private readonly allPlans: Plan[] = [
    new Plan('Arcade', 9, Billing.Monthly, 'icon-arcade.svg'),
    new Plan('Advanced', 12, Billing.Monthly, 'icon-advanced.svg'),
    new Plan('Pro', 15, Billing.Monthly, 'icon-pro.svg'),
    new Plan('Arcade', 90, Billing.Yearly, 'icon-arcade.svg'),
    new Plan('Advanced', 120, Billing.Yearly, 'icon-advanced.svg'),
    new Plan('Pro', 150, Billing.Yearly, 'icon-pro.svg')
  ];
  readonly selected = output<boolean>();
  plans: Plan[] = [];
  selectedPlanPrice: number = 9;
  preSelectedBilling!: Billing;
  isPaidYearly: boolean = false;

  ngOnInit() {
    this.isPaidYearly = this.formService.state.billing === Billing.Yearly;
    this.fillPlans(this.isPaidYearly ? Billing.Yearly : Billing.Monthly);
    this.selectedPlanPrice = this.formService.state.plan?.price || 0;

    if (this.selectedPlanPrice) {
      this.selected.emit(false);
    }
  }

  onSelectPlan(selectedPlan: Plan) {
    this.selected.emit(false);
    this.formService.validatePlanStep(selectedPlan);
  }

  onChangeBilling() {
    this.fillPlans(this.isPaidYearly ? Billing.Yearly : Billing.Monthly);
    this.selected.emit(true);
  }

  private fillPlans(billing: Billing) {
    this.plans = this.allPlans.filter((plan) => plan.billing === billing);
  }
}
