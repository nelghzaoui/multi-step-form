import { Injectable } from '@angular/core';
import { Billing, Plan } from '../models/plan.class';
import { PersonnalInfo } from '../models/personal-info.interface';
import { AddOn } from '../models/add-on.class';

@Injectable({ providedIn: 'root' })
export class FormService {
  private _state: State = {
    formValues: null,
    plan: null,
    addOns: [],
    billing: Billing.Monthly
  };

  validateInfoStep(formValues: PersonnalInfo) {
    this._state.formValues = formValues;
    console.log(this._state);
  }

  validatePlanStep(selectedPlan: Plan) {
    this._state.plan = selectedPlan;
    this._state.billing = selectedPlan.billing;
  }

  validateAddOnsStep(addOns: AddOn[]) {
    this._state.addOns = addOns;
  }

  get state() {
    return this._state;
  }
}

interface State {
  formValues: PersonnalInfo | null;
  plan: Plan | null;
  addOns: AddOn[] | null;
  billing: Billing;
}
