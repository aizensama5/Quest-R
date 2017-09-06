import {TimeModel} from './time.model';

export class ReservationModel {
  dayId: number;
  day: string;
  time: TimeModel[];

  constructor () {
    this.dayId = null;
    this.day = '';
    this.time = [];
  }
}
