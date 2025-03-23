import { Component, input, output } from '@angular/core';

@Component({
  selector: 'nas-next-button',
  template: `
    <button
      (click)="clicked.emit()"
      [disabled]="isDisable()"
      class="bg-marine text-white p-3 px-4 rounded disabled:bg-gray"
    >
      Next Step
    </button>
  `
})
export class NextButtonComponent {
  isDisable = input(false);
  clicked = output();
}
