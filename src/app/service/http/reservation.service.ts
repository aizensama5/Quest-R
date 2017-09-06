import { Injectable } from '@angular/core';
import { MainReservationModel } from '../../models/main-reservation.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ReservationService {
  private static readonly dataBaseName = 'reservation/';
  static getMonthsName() {
    return [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декября'
    ];
  }

  static checkDayMonthFormat (el) {
    return el.length > 1 ? el : '0' + el;
  }

  convertDateSeparatedBySlash (date: string) {
    const fullDate = new Date(date);
    let day = fullDate.getDate().toString(10),
      month = (fullDate.getMonth() + 1).toString(10);
    day = ReservationService.checkDayMonthFormat(day);
    month = ReservationService.checkDayMonthFormat(month);
    return day + '/' + month;
  }

  convertDateToString (date: string) {
    const fullDate = new Date(date);
    let day = fullDate.getDate().toString(10);
    const monthIndex = fullDate.getMonth(),
      monthsName = ReservationService.getMonthsName();
    day = ReservationService.checkDayMonthFormat(day);
    return day + ' ' + monthsName[monthIndex];
  }

  constructor(private dataBaseService: AngularFireDatabase) {}

  addReview(reservation: MainReservationModel): Promise<void> {
    return <Promise<void>>this.dataBaseService.object(ReservationService.dataBaseName + reservation.roomId).set(reservation.toJSON());
  }

  all(): FirebaseListObservable<MainReservationModel[]> {
    return <FirebaseListObservable<MainReservationModel[]>>this.dataBaseService
      .list(ReservationService.dataBaseName)
      .map((items) => items.map(MainReservationModel.fromJSON));
  }
}
