import { Component } from '@angular/core';

@Component({
  selector: 'nas-card',
  template: `
    <div class="bg-white border border-white shadow-xl p-6 rounded-xl">
      <ng-content />
    </div>
  `
})
export class CardComponent {}
