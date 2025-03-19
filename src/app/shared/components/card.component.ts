import { Component } from '@angular/core';

@Component({
  selector: 'nas-card',
  template: `
    <div class="card">
      <ng-content />
    </div>
  `
})
export class CardComponent {}
