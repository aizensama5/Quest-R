export class TimeModel {
  timeSlotId: number;
  time: string;
  price: number;
  currency?: string;
  background?: string;
  isActive: boolean;

  constructor () {
    this.timeSlotId = null;
    this.time = '';
    this.price = null;
    this.currency = 'złoty';
    this.background = '#ff9200';
    this.isActive = true;
  }
}
