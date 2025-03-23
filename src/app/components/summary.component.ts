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
        <p class="text-gray font-sm">
          Double-check everything look OK before confirming.
        </p>

        <div class="flex flex-col gap-6">
          <ul
            class="flex flex-col gap-2 border border-magnolia bg-alabaster rounded-lg p-3 text-gray"
          >
            <li class="flex justify-between items-center pb-1">
              <div class="flex flex-col items-start">
                <span class="text-marine font-bold">Arcade (Monthly)</span>
                <button class="underline">Change</button>
              </div>
              <span class="text-marine text-sm font-bold">$9/mo</span>
            </li>

            <div class="border-[0.5px] border-b-light text-light"></div>

            <li class="flex justify-between py-1">
              <span>Online service</span>
              <span class="text-marine text-sm">$1/mo</span>
            </li>
            <li class="flex justify-between ">
              <span>Larger storage</span>
              <span class="text-marine text-sm">$2/mo</span>
            </li>
          </ul>

          <div class="flex justify-between px-4 text-gray">
            <span class="">Total (per month)</span>
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
