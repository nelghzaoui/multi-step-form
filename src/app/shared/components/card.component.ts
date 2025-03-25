import { Component } from '@angular/core';

@Component({
  selector: 'nas-card',
  template: `
    <div
      class="bg-white border border-white shadow-xl p-5 py-8 rounded-xl
               lg:flex lg:py-4 lg:px-4"
    >
      <img
        src="assets/images/bg-sidebar-desktop.svg"
        alt="Description of the image"
        class="w-full object-contain hidden lg:flex lg:w-auto"
      />
      <div class="lg:px-[7rem]">
        <ng-content />
      </div>
    </div>
  `
})
export class CardComponent {}
