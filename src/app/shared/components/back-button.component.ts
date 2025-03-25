import { Component, output } from '@angular/core';

@Component({
  selector: 'nas-back-button',
  template: `
    <button
      (click)="clicked.emit()"
      class="bg-white text-gray p-3 px-4 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purplish hover:text-marine"
    >
      Go Back
    </button>
  `
})
export class BackButtonComponent {
  clicked = output();
}
