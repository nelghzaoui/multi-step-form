import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'nas-summary',
  imports: [CardComponent, CurrencyPipe],
  template: `
    <nas-card>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-marine">Finishing up</h1>
        <p class="text-gray font-thin">
          Double-check everything look OK before confirming.
        </p>

        <div class="flex flex-col gap-6">
          <ul
            class="flex flex-col gap-2 border border-magnolia bg-magnolia rounded-lg p-3 text-sm text-gray"
          >
            <li class="flex justify-between ">
              <span class="text-marine font-bold">Arcade (Monthly)</span>
              <span class="text-marine text-sm">$9/mo</span>
            </li>
            <div class="border border-b-light text-light"></div>
            <li class="flex justify-between">
              <span>On (Monthly)</span>
              <span class="text-marine text-sm">$12/mo</span>
            </li>
            <li class="flex justify-between ">
              <span>Pro (Monthly)</span>
              <span class="text-marine text-sm">$15/mo</span>
            </li>
          </ul>

          <div class="flex justify-between">
            <span>Total (per month)</span>
            <span class="text-purplish font-bold">+$12/mo</span>
          </div>
        </div>
      </div>
    </nas-card>
  `
})
export class SummaryComponent implements OnInit {
  ngOnInit() {}
}
