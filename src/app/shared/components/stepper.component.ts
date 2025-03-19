import { Component, input } from '@angular/core';

@Component({
  selector: 'nas-stepper',
  template: ``
})
export class StepperComponent {
  currentStep = input<number>();
  maxStep = input<number>();
}
