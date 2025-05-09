import { CardComponent } from '../shared';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  output
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PersonnalInfo } from '../models/personal-info.interface';
import { distinctUntilChanged } from 'rxjs';
import { FormService } from '../services/form.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nas-personal-info',
  imports: [ReactiveFormsModule, NgClass],
  template: `
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold text-marine lg:text-4xl">Personal info</h1>
      <p class="text-gray font-thin lg:text-lg">
        Please provide your name, email,address and phone number.
      </p>

      <form
        [formGroup]="form"
        class="flex flex-col text-marine text-sm font-thin gap-1 lg:gap-4 lg:text-lg lg:pt-6"
      >
        <div class="flex justify-between">
          <label for="name">Name</label>
          @if(name?.invalid && (name?.touched || name?.dirty)) {
          <p class="text-red-500 font-bold">You didn't enter your name!</p>
          }
        </div>
        <input
          [ngClass]="{
            'border-red-500 focus:ring-2 focus:ring-red-500':
              name?.invalid && (name?.touched || name?.dirty)
          }"
          class="border border-light p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purplish"
          type="text"
          id="name"
          formControlName="name"
          required
        />

        <div class="flex justify-between">
          <label for="email">Email</label>
          @if(email?.invalid && (email?.touched || email?.dirty)) {
          @if(email?.hasError('required')) {
          <p class="text-red-500 font-bold">You didn't enter your email!</p>
          } @if(email?.hasError('email')) {
          <p class="text-red-500 font-bold">
            Your email is not well formatted!
          </p>
          } }
        </div>
        <input
          [ngClass]="{
            'border-red-500 focus:ring-2 focus:ring-red-500':
              email?.invalid && (email?.touched || email?.dirty)
          }"
          class="border border-light p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purplish"
          type="email"
          id="email"
          formControlName="email"
          required
        />

        <div class="flex justify-between">
          <label for="phone">Phone</label>
          @if(phone?.invalid && (phone?.touched || phone?.dirty)) {
          <p class="text-red-500 font-bold">You didn't enter your phone!</p>
          }
        </div>
        <input
          [ngClass]="{
            'border-red-500 focus:ring-2 focus:ring-red-500':
              phone?.invalid && (phone?.touched || phone?.dirty)
          }"
          class="border border-light p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purplish"
          type="tel"
          id="phone"
          formControlName="phone"
          required
        />
      </form>
    </div>
  `
})
export class PersonalInfoComponent implements OnInit, AfterViewInit {
  private readonly builder = inject(FormBuilder);
  private readonly formService = inject(FormService);
  validated = output<boolean>();
  values = output<PersonnalInfo>();

  form!: FormGroup;

  ngOnInit() {
    this.form = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.prefillValues();
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.validated.emit(this.form.valid);

      if (this.form.valid) {
        this.values.emit(this.form.value);
      }
    });
    this.form.updateValueAndValidity();
  }

  private prefillValues() {
    const state = this.formService.state;
    if (state && state.formValues) {
      const { name, email, phone } = state.formValues;

      this.name?.patchValue(name);
      this.email?.patchValue(email);
      this.phone?.patchValue(phone);
      return this.validated.emit(true);
    }
    this.validated.emit(false);
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get phone(): AbstractControl | null {
    return this.form.get('phone');
  }
}
