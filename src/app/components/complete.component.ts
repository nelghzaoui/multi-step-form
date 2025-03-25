import { Component } from '@angular/core';

@Component({
  selector: 'nas-complete',
  template: `
    <div class="flex flex-col gap-4 text-center">
      <img
        src="/assets/images/icon-thank-you.svg"
        class="max-w-[70px] m-auto pt-12 pb-5"
        alt=""
      />

      <h1 class="text-2xl font-bold text-marine">Thank you!</h1>

      <div>
        <p class="text-gray font-sm">
          Thanks for confirming your subscription!
        </p>
        <p class="text-gray font-sm">
          We hope you have fun using our platform. If you ever need support,
          please feel free to email us at support&#64;loremgaming.com.
        </p>
      </div>
    </div>
  `
})
export class CompleteComponent {}
