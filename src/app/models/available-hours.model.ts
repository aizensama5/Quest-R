export class AvailableHoursModel {
  id: number;
  hour: string;
  priceTypeId: number;

  constructor() {
    this.id = 1;
    this.hour = '';
    this.priceTypeId = null;
  }
}
