import { Component, inject, OnInit, output } from '@angular/core';
import { CardComponent } from '../shared';
import { CurrencyPipe } from '@angular/common';
import { FormService } from '../services/form.service';

@Component({
  selector: 'nas-summary',
  imports: [CurrencyPipe],
  template: `
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold text-marine lg:text-4xl">Finishing up</h1>
      <p class="text-gray font-sm lg:text-lg">
        Double-check everything look OK before confirming.
      </p>

      @if(state && state.plan) {
      <div class="flex flex-col gap-6">
        <ul
          class="flex flex-col gap-2 border border-magnolia bg-alabaster rounded-lg p-3 text-gray lg:p-5"
        >
          <li class="flex justify-between items-center pb-1">
            <div class="flex flex-col items-start">
              <span class="text-marine font-bold lg:text-base">
                {{ state.plan.label }} ({{ state.billing }})</span
              >
              <button
                (click)="changed.emit()"
                class="underline cursor-pointer hover:text-purplish"
              >
                Change
              </button>
            </div>
            <span class="text-marine text-sm font-bold lg:text-base">
              {{ state.plan.price | currency : 'USD' : 'symbol' : '1.0-0' }}/{{
                state.billing
              }}
            </span>
          </li>

          @if(state.addOns&& state.addOns.length > 0) {
          <div class="border-[0.5px] border-b-light text-light lg:my-3"></div>

          } @for(addOn of state.addOns; track addOn) {
          <li class="flex justify-between py-1">
            <span>{{ addOn.label }}</span>
            <span class="text-marine text-sm">
              {{ addOn.price | currency : 'USD' : 'symbol' : '1.0-0' }}/{{
                addOn.billing
              }}
            </span>
          </li>
          }
        </ul>

        <div class="flex justify-between px-4 text-gray">
          <span class="">Total (per {{ state.billing }})</span>
          <span class="text-purplish font-bold lg:text-xl">
            +{{ total | currency : 'USD' : 'symbol' : '1.0-0' }}/{{
              state.billing
            }}
          </span>
        </div>
      </div>
      }
    </div>
  `
})
export class SummaryComponent implements OnInit {
  private readonly formService = inject(FormService);
  readonly state = this.formService.state;
  changed = output();
  total: number = 0;

  ngOnInit() {
    this.total =
      (this.state.plan?.price ?? 0) +
      (this.state.addOns?.reduce((acc, curr) => acc + curr.price, 0) ?? 0);
  }
}
