import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../shared';

@Component({
  selector: 'nas-personal-info',
  imports: [CardComponent],
  template: `
    <nas-card>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-marine">Personal info</h1>
        <p class="text-gray font-thin">
          Please provide your name, email,address and phone number.
        </p>

        <form class="flex flex-col text-marine text-sm font-thin gap-1">
          <label for="name">Name</label>
          <input
            class="border border-light p-2 rounded mb-2"
            type="text"
            id="name"
          />
          <label for="email">Email</label>
          <input
            class="border border-light p-2 rounded mb-2"
            type="email"
            id="email"
          />
          <label for="phone">Phone</label>
          <input
            class="border border-light p-2 rounded mb-2"
            type="tel"
            id="phone"
          />
        </form>
      </div>
    </nas-card>
  `
})
export class PersonalInfoComponent implements OnInit {
  ngOnInit() {}
}
