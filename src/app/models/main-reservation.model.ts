import { ReservationModel } from './reservation.model';
import { FirebaseUtils } from '../shared/firebase.utils';

export class MainReservationModel {
  roomId: number;
  reservation: ReservationModel[];

  static fromJSON(values) {
    const reservation = new MainReservationModel();

    for (const value in values) {
      if (reservation.hasOwnProperty(value)) {
        reservation[value] = values[value];
      }
    }
    return reservation;
  }

  static fromJsonArray(json: any[]): MainReservationModel[] {
    return json.map(MainReservationModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor () {
    this.roomId = null;
    this.reservation = [];
  }
}
