import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'nas-next-button',
  imports: [NgClass],
  template: `
    <button
      (click)="clicked.emit()"
      [disabled]="isDisable()"
      class="bg-marine cursor-pointer text-white p-3 px-4 rounded disabled:bg-gray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purplish"
      [ngClass]="{ 'bg-purplish': label() === 'Confirm' }"
    >
      {{ label() }}
    </button>
  `
})
export class NextButtonComponent {
  label = input('Next Step');
  isDisable = input(false);
  clicked = output();
}
