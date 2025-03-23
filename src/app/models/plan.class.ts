export class Plan {
  constructor(
    public label: string,
    public price: number,
    public billing: Billing,
    public iconPath: string,
    public description?: string
  ) {
    this.iconPath = 'assets/images/' + iconPath;
    this.description = billing === Billing.Yearly ? '2 months free' : '';
  }
}

export enum Billing {
  Monthly = 'mo',
  Yearly = 'yr'
}
