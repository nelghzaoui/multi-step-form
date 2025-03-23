import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  output
} from '@angular/core';
import { CardComponent } from '../shared';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Billing, Plan } from '../models/plan.class';
import { FormsModule } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'nas-plans',
  imports: [CurrencyPipe, FormsModule, NgClass, CardComponent],
  template: `
    <nas-card>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-marine">Select your plan</h1>
        <p class="text-gray font-sm">
          You have the option of monthly or yearly billing.
        </p>

        <fieldset class="flex flex-col gap-3">
          @for(plan of plans; track plan) {
          <label
            for="{{ plan.label }}+{{ plan.price }}"
            class="flex cursor-pointer items-center gap-4 rounded-lg border border-light bg-white p-4 text-sm font-medium shadow-xs 
                 hover:border-gray has-[:checked]:border-purplish has-[:checked]:bg-magnolia"
          >
            <img [src]="plan.iconPath" [alt]="plan.label" />

            <div class="flex flex-col">
              <span class="text-marine font-bold"> {{ plan.label }}</span>
              <span class="text-gray text-sm">
                {{ plan.price | currency : 'USD' : 'symbol' : '1.0-0' }}/{{
                  plan.billing
                }}
              </span>
            </div>
            <input
              type="radio"
              name="plan"
              (change)="onSelectPlan(plan)"
              [value]="plan.label"
              id="{{ plan.label }}+{{ plan.price }}"
              class="sr-only"
              [checked]="plan.price === preSelectedPlan?.price"
            />
          </label>
          }
        </fieldset>

        <div
          class="flex justify-center gap-6 border border-magnolia bg-magnolia p-4 rounded-lg"
        >
          <span [ngClass]="{ 'text-gray': isPaidYearly }"> Monthly </span>
          <label
            for="monthly"
            class="relative flex gap-4 h-6 w-12 cursor-pointer rounded-full bg-marine transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-marine"
          >
            <input
              type="checkbox"
              id="monthly"
              class="peer sr-only"
              [(ngModel)]="isPaidYearly"
              (change)="onChangeBilling()"
            />
            <span
              class="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-6"
            ></span>
          </label>
          <span [ngClass]="{ 'text-gray': !isPaidYearly }"> Yearly </span>
        </div>
      </div>
    </nas-card>
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
  preSelectedPlan: Plan | null = null;
  preSelectedBilling!: Billing;
  isPaidYearly: boolean = false;

  ngOnInit() {
    const prefilledBilling = this.formService.state.billing;
    const isPaidYearly = prefilledBilling === Billing.Yearly;
    this.isPaidYearly = isPaidYearly;
    this.fillPlans(prefilledBilling || Billing.Monthly);
    this.preSelectedPlan = this.formService.state.plan;
    this.selected.emit(true);
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
