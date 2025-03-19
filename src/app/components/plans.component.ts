import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'nas-plans',
  imports: [CardComponent, CurrencyPipe],
  template: `
    <nas-card>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-marine">Select your plan</h1>
        <p class="text-gray font-thin">
          You have the option of monthly or yearly billing.
        </p>

        <fieldset class="flex flex-col gap-3">
          @for(plan of plans; track plan) {
          <label
            [for]="plan.label"
            class="flex cursor-pointer items-center gap-4 rounded-lg border border-light bg-white p-4 text-sm font-medium shadow-xs 
                 hover:border-gray has-[:checked]:border-purplish has-[:checked]:bg-magnolia"
          >
            <img [src]="plan.iconPath" [alt]="plan.label" />

            <div class="flex flex-col">
              <span class="text-marine"> {{ plan.label }}</span>
              <span class="text-gray text-sm">
                {{ plan.price | currency : 'USD' : 'symbol' : '1.0-0' }}/{{
                  plan.billing
                }}
              </span>
            </div>
            <input
              type="radio"
              name="plan"
              [value]="plan.label"
              [id]="plan.label"
              class="sr-only"
            />
          </label>
          }
        </fieldset>

        <div
          class="flex justify-center gap-6 border border-magnolia bg-magnolia p-4 rounded-lg"
        >
          <span> Monthly </span>
          <label
            for="monthly"
            class="relative flex gap-4 h-6 w-12 cursor-pointer rounded-full bg-marine transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-marine"
          >
            <input type="checkbox" id="monthly" class="peer sr-only" />
            <span
              class="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-6"
            ></span>
          </label>
          <span> Yearly </span>
        </div>
      </div>
    </nas-card>
  `
})
export class PlansComponent implements OnInit {
  plans: Plan[] = plans;

  ngOnInit() {}
}

interface Plan {
  label: string;
  price: number;
  billing: string;
  iconPath: string;
}

const plans: Plan[] = [
  {
    label: 'Arcade',
    price: 9,
    billing: 'mo',
    iconPath: 'assets/images/icon-arcade.svg'
  },
  {
    label: 'Advanced',
    price: 12,
    billing: 'mo',
    iconPath: 'assets/images/icon-advanced.svg'
  },
  {
    label: 'Pro',
    price: 15,
    billing: 'mo',
    iconPath: 'assets/images/icon-pro.svg'
  }
];
