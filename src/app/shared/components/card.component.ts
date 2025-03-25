import { Component } from '@angular/core';

@Component({
  selector: 'nas-card',
  template: `
    <div
      class="bg-white border border-white shadow-xl p-5 py-8 rounded-xl
               lg:flex lg:py-4 lg:px-4 lg:relative lg:h-[700px]"
    >
      <img
        src="assets/images/bg-sidebar-desktop.svg"
        alt="Description of the image"
        class="w-full object-contain hidden lg:flex lg:w-auto"
      />

      <div class="absolute top-14 left-14">
        <ng-content select="card-step"></ng-content>
      </div>

      <div
        class="lg:px-[6rem] lg:flex lg:flex-col lg:justify-between lg:pt-10 lg:pb-4"
      >
        <ng-content select="card-content" />
        <ng-content select="card-nav" />
      </div>
    </div>
  `
})
export class CardComponent {}
