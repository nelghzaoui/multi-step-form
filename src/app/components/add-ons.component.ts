import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CardComponent } from '../shared';
import { AddOn } from '../models/add-on.class';
import { Billing } from '../models/plan.class';
import { FormService } from '../services/form.service';

@Component({
  selector: 'nas-add-ons',
  imports: [CardComponent, CurrencyPipe],
  template: `
    <nas-card>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-marine">Pick add-ons</h1>
        <p class="text-gray font-sm">
          Add-ons help enhance your gaming experience.
        </p>

        <fieldset class="flex flex-col gap-3 pt-2">
          @for(addOn of addOns; track addOn) {
          <label
            [for]="addOn.label"
            tabindex="0"
            class="flex cursor-pointer items-center gap-4 rounded-lg border border-light bg-white p-4 text-sm font-medium shadow-xs 
         hover:border-gray focus:outline-none focus:ring-2 focus:ring-purplish"
          >
            <input
              type="checkbox"
              name="addon"
              [value]="addOn"
              [id]="addOn.label"
              (change)="onSelect(addOn, $event)"
              [checked]="isSelected(addOn)"
              class="border border-light size-5 rounded"
              multiple="true"
            />

            <div class="flex justify-between items-center w-full">
              <div class="flex flex-col">
                <span class="text-marine font-bold">{{ addOn.label }}</span>
                <span class="text-gray text-xs font-sm">{{
                  addOn.description
                }}</span>
              </div>

              <span class="text-purplish font-sm text-xs">
                +{{ addOn.price | currency : 'USD' : 'symbol' : '1.0-0' }}/yr
              </span>
            </div>
          </label>

          }
        </fieldset>
      </div>
    </nas-card>
  `
})
export class AddOnsComponent implements OnInit {
  private readonly formService = inject(FormService);
  private readonly allAddOns: AddOn[] = [
    new AddOn(
      'Online service',
      'Access to multiplayer games',
      1,
      Billing.Monthly
    ),
    new AddOn('Larger storage', 'Extra 1TB of cloud save', 2, Billing.Monthly),
    new AddOn(
      'Customizable profile',
      'Customer theme on your profile',
      2,
      Billing.Monthly
    ),
    new AddOn(
      'Online service',
      'Access to multiplayer games',
      10,
      Billing.Yearly
    ),
    new AddOn('Larger storage', 'Extra 1TB of cloud save', 20, Billing.Yearly),
    new AddOn(
      'Customizable profile',
      'Customer theme on your profile',
      20,
      Billing.Yearly
    )
  ];
  addOns: AddOn[] = [];
  selectedAddOns: AddOn[] = [];

  ngOnInit() {
    this.fillPlans(this.formService.state.billing);
    this.selectedAddOns = this.formService.state.addOns || [];
  }

  onSelect(addOn: AddOn, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedAddOns.push(addOn);
    } else {
      this.selectedAddOns = this.selectedAddOns.filter(
        (a) => a.label !== addOn.label
      );
    }
    this.formService.validateAddOnsStep(this.selectedAddOns);
  }

  isSelected(addOn: AddOn): boolean {
    return this.selectedAddOns.some((a) => a.label === addOn.label);
  }

  private fillPlans(billing: Billing) {
    this.addOns = this.allAddOns.filter((plan) => plan.billing === billing);
  }
}
