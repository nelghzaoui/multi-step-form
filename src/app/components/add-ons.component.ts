import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CardComponent } from '../shared';
import { AddOn } from '../models/add-on.class';

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
            class="flex cursor-pointer items-center gap-4 rounded-lg border border-light bg-white p-4 text-sm font-medium shadow-xs 
                 hover:border-gray has-[:checked]:border-purplish has-[:checked]:bg-magnolia"
          >
            <input
              type="checkbox"
              name="addon"
              [value]="addOn"
              [id]="addOn.label"
              class="border border-light size-5 rounded"
            />

            <div class="flex justify-between items-center w-full">
              <div class="flex flex-col">
                <span class="text-marine font-bold"> {{ addOn.label }}</span>
                <span class="text-gray text-xs font-sm"
                  >{{ addOn.description }}
                </span>
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
  addOns: AddOn[] = [
    new AddOn('Online service', 'Access to multiplayer games', 1),
    new AddOn('Larger storage', 'Extra 1TB of cloud save', 2),
    new AddOn('Customizable profile', 'Customer theme on your profile', 2)
  ];

  ngOnInit() {}
}
