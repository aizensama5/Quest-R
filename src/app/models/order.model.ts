import { ReservationModel } from './reservation.model';
import { BookerInfoModel } from './booker-info.model';

export class OrderModel {
  id: number;
  reservationData: ReservationModel;
  bookerData: BookerInfoModel;
}
