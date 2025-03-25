import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'nas-stepper',
  imports: [NgClass],
  template: `
    <ul class="flex gap-5 lg:flex-col lg:gap-8">
      @for(step of steps(); track step) {
      <li class="lg:flex lg:gap-5 lg:items-center">
        <div
          [ngClass]="{
            'bg-sky border-sky text-marine': step === currentStep(),
            'border-white text-white': step !== currentStep()
          }"
          class="border-1 rounded-4xl px-3 py-1"
        >
          {{ step }}
        </div>

        <div class="hidden lg:flex lg:flex-col text-white">
          <span class="text-sm font-thin">STEP {{ step }}</span>
          <span class="uppercase text-sm font-bold tracking-[.05em]">
            {{ stepTitles()[step - 1] }}
          </span>
        </div>
      </li>
      }
    </ul>
  `
})
export class StepperComponent {
  currentStep = input<number>();
  maxStep = input<number>(4);
  stepTitles = input<string[]>([]);
  steps = computed(() =>
    Array.from({ length: this.maxStep() }, (_, i) => i + 1)
  );
}
