import { Component, output } from '@angular/core';

@Component({
  selector: 'nas-back-button',
  template: `
    <button
      (click)="clicked.emit()"
      class="bg-white text-gray p-3 px-4 rounded"
    >
      Go Back
    </button>
  `
})
export class BackButtonComponent {
  clicked = output();
}
