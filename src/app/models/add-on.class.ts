import { Billing } from './plan.class';

export class AddOn {
  constructor(
    public label: string,
    public description: string,
    public price: number,
    public billing: Billing
  ) {}
}
