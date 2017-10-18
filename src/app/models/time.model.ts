export class TimeModel {
  timeSlotId: number;
  time: string;
  price: number;
  currency: string;
  background: string;

  constructor () {
    this.timeSlotId = null;
    this.time = '';
    this.price = null;
    this.currency = '';
    this.background = '';
  }
}
