import { Injectable } from '@angular/core';
import { MainReservationModel } from '../../models/main-reservation.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import {ReservationModel} from '../../models/reservation.model';

@Injectable()
export class ReservationService {
  private static readonly dataBaseName = 'reservation/';
  static readonly RESERVATION_DAYS_COUNT = 28;
  static readonly RESERVATION_DAYS_IN_WEEKS_COUNT = 7;
  static readonly RESERVATION_WEEKS_COUNT = 4;
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

  prepareReservationData (reservationData: MainReservationModel[], dayStart: number): MainReservationModel[] {
    let roomIndex = 0;
    reservationData.forEach((resData: MainReservationModel) => {
      resData.reservation.forEach((resDataReserv: ReservationModel) => {
        if (resDataReserv.dayId === dayStart) {
          resData.reservation = resData.reservation
            .concat(resData.reservation
              .splice(0, resData.reservation.length - (ReservationService.RESERVATION_DAYS_IN_WEEKS_COUNT - dayStart + 1)));
        }
      });
      roomIndex++;
    });
    return reservationData;
  }

  days () {
    const days = [{
      day: ''
    }];
    const day = new Date();
    day.setDate(day.getDate() - 1);
    for (let i = 0; i < ReservationService.RESERVATION_DAYS_COUNT; i++) {
      days[i] = {day: ''};
      day.setDate(day.getDate() + 1);
      days[i].day = day.toDateString();
    }
    return days;
  }

  getCurrentDayOfWeek(day: string) {
    return new Date(day).getDay();
  }

  constructor(private dataBaseService: AngularFireDatabase) {}

  addReservation(reservation: MainReservationModel): Promise<void> {
    return <Promise<void>>this.dataBaseService.object(ReservationService.dataBaseName + reservation.roomId).set(reservation.toJSON());
  }

  all(): FirebaseListObservable<MainReservationModel[]> {
    return <FirebaseListObservable<MainReservationModel[]>>this.dataBaseService
      .list(ReservationService.dataBaseName)
      .map((items) => items.map(MainReservationModel.fromJSON));
  }
}
