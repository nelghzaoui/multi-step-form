import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="bg-purplish text-3xl font-bold p-4">Personal info</div>
  `
})
export class AppComponent {
  title = 'multi-form-step';
}
