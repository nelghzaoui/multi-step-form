export class Plan {
  constructor(
    public label: string,
    public price: number,
    public billing: Billing,
    public iconPath: string
  ) {
    this.iconPath = 'assets/images/' + iconPath;
  }
}

export enum Billing {
  Monthly = 'yr',
  Yearly = 'mo'
}
