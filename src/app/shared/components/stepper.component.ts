import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'nas-stepper',
  imports: [NgClass],
  template: `
    <div class="flex gap-5">
      @for(step of steps(); track step) {
      <button
        [ngClass]="{
          'bg-sky border-sky text-marine': step === currentStep(),
          'border-white text-white': step !== currentStep()
        }"
        class="border-1 rounded-4xl px-3 py-1"
      >
        {{ step }}
      </button>
      }
    </div>
  `
})
export class StepperComponent {
  currentStep = input<number>();
  maxStep = input<number>(4);
  steps = computed(() =>
    Array.from({ length: this.maxStep() }, (_, i) => i + 1)
  );
}
