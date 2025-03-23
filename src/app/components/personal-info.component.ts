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
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'nas-personal-info',
  imports: [CardComponent, ReactiveFormsModule],
  template: `
    <nas-card>
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold text-marine">Personal info</h1>
        <p class="text-gray font-thin">
          Please provide your name, email,address and phone number.
        </p>

        <form
          [formGroup]="form"
          class="flex flex-col text-marine text-sm font-thin gap-1"
        >
          <label for="name">Name</label>
          <input
            class="border border-light p-2 rounded mb-2"
            type="text"
            id="name"
            formControlName="name"
            required
          />

          @if(name?.invalid && (name?.touched || name?.dirty)) {
          <p class="text-red-500">You didn't enter your name!</p>
          }

          <label for="email">Email</label>
          <input
            class="border border-light p-2 rounded mb-2"
            type="email"
            id="email"
            formControlName="email"
            required
          />
          @if(email?.invalid && (email?.touched || email?.dirty)) {
          @if(email?.hasError('required')) {
          <p class="text-red-500">You didn't enter your email!</p>
          } @if(email?.hasError('email')) {
          <p class="text-red-500">Your email is not well formatted!</p>
          } }

          <label for="phone">Phone</label>
          <input
            class="border border-light p-2 rounded mb-2"
            type="tel"
            id="phone"
            formControlName="phone"
            required
          />
          @if(phone?.invalid && (phone?.touched || phone?.dirty)) {
          <p class="text-red-500">You didn't enter your phone!</p>
          }
        </form>
      </div>
    </nas-card>
  `
})
export class PersonalInfoComponent implements OnInit, AfterViewInit {
  private readonly builder = inject(FormBuilder);
  validated = output<boolean>();
  values = output<PersonnalInfo>();

  form!: FormGroup;

  ngOnInit() {
    this.form = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
    this.validated.emit(false);
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.validated.emit(this.form.valid);

      if (this.form.valid) {
        this.values.emit(this.form.value);
      }
    });
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
