export class TimeModel {
  timeSlotId: number;
  time: string;
  is_past: boolean;
  is_booked: boolean;
  is_bought: boolean;
  price: number;
  currency: string;
  background: string;

  constructor () {
    this.timeSlotId = null;
    this.time = '';
    this.is_past = false;
    this.is_booked = false;
    this.is_bought = false;
    this.price = null;
    this.currency = '';
    this.background = '';
  }
}
