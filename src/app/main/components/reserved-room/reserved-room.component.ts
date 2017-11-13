import {Component, Input, OnInit, Output} from '@angular/core';
import {RoomModel} from '../../../models/room.model';
import {RoomService} from '../../../service/http/room.service';
import {ReservationModel} from '../../../models/reservation.model';
import {ReservationService} from '../../../service/http/reservation.service';
import * as mainReducer from '../../../reducers';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {DaysSettingsService} from "../../../service/days-settings.service";
import {PricesTypesService} from "../../../service/prices-types.service";
import {DaysModel} from "../../../models/days.model";
import {AvailableHoursModel} from "../../../models/available-hours.model";
import {PricesTypesModel} from "../../../models/prices-types.model";
import {TimeModel} from "../../../models/time.model";
import {TimeService} from "../../../service/time.service";
import {OrderService} from "../../../service/http/order.service";
import {OrderModel} from "../../../models/order.model";
import {Time} from "ngx-bootstrap/timepicker/timepicker.models";

@Component({
  moduleId: module.id,
  selector: 'app-main-reserved-room',
  templateUrl: 'reserved-room.component.html',
  styleUrls: ['reserved-room.component.scss']
})
export class ReservedRoomComponent implements OnInit {
  @Input() title: string;
  selectedRoom: RoomModel = new RoomModel();
  roomReservationData: ReservationModel[] = [];
  reservationData: ReservationModel[] = [];
  rooms: RoomModel[] = [];
  timeList = [];
  room: RoomModel = new RoomModel();
  reserveData: ReservationModel = new ReservationModel();
  showReservationTable = false;
  showOrderingTable = false;
  roomId: number;
  isOpenedRoomPage: boolean;
  reservationDays: any[];
  currentDayOfWeek: number;
  roomOrders: OrderModel[] = [];

  constructor(private roomService: RoomService,
              private reservationService: ReservationService,
              private store: Store<mainReducer.State>,
              private route: ActivatedRoute,
              public daysSettingsService: DaysSettingsService,
              public pricesTypesService: PricesTypesService,
              public timeService: TimeService,
              public orderService: OrderService) {
    this.getAllRooms();
    if (+this.route.snapshot.params.id) {
      this.isOpenedRoomPage = true;
      this.roomService.roomById(+this.route.snapshot.params.id).subscribe((room: RoomModel[]) => {
        this.room = room[0];
        this.selectedRoom = room[0];
        this.initializeReserveCalendar();
      });
    } else {
      this.store.select(mainReducer.getRoom).subscribe((room: RoomModel) => {
        if (room) {
          this.selectedRoom = room;
          this.room = room;
          this.initializeReserveCalendar();
        }
      });
    }
  }

  initializeReserveCalendar(): void {
    this.orderService.roomOrders(this.room.id).subscribe((roomOrders: OrderModel[]) => {
      this.roomOrders = roomOrders;
    });
    this.generateReservationTable()
      .then((reservationData: ReservationModel[]) => {
        this.reservationData = reservationData;
        this.reservationDays = this.reservationService.days();
        this.currentDayOfWeek = this.reservationService.getCurrentDayOfWeek(this.reservationDays[0].day);
        this.roomReservationData = this.reservationService.prepareReservationData(reservationData, this.currentDayOfWeek);
        this.timeList = this.getTime(this.getTimeList());
        this.onSelectRoom(this.room);
      });
  }

  isReservationSlotActive(timeSlotId: string): boolean {
    let isActive: boolean = true;
    const timeSlotTimestamp = timeSlotId ? timeSlotId.split('_')[1] : this.timeService.uniqueIdByTimestamp() + 1;
    if (this.timeService.uniqueIdByTimestamp() > +timeSlotTimestamp) {
      isActive = false;
    } else {
      this.roomOrders.forEach((roomOrder: OrderModel) => {
        if (roomOrder.id === timeSlotId.toString() && roomOrder.confirmed) {
          isActive = false;
        }
      });
    }
    return isActive;
  }

  generateReservationTable(): Promise<any[]> {
    return new Promise((resolve) => {
      let reservationData: any[] = [];
      this.daysSettingsService.roomDaysSettings(this.room.id).subscribe((daysSettings: DaysModel[]) => {
        this.pricesTypesService.all().subscribe((priceType: PricesTypesModel[]) => {
          let reservationIndex = 0;
          daysSettings.forEach((daySetting: DaysModel) => {
            reservationData[reservationIndex] = new ReservationModel();
            reservationData[reservationIndex].dayId = daySetting.id;
            reservationData[reservationIndex].day = daySetting.weekDay;
            let avHourIndex = 0;
            daySetting.availableHours.forEach((avHour: AvailableHoursModel) => {
              const priceList = this.pricesTypesService.getPriceTypeByPriceTypeId(priceType, avHour.priceTypeId);
              reservationData[reservationIndex].time[avHourIndex] = new TimeModel();
              reservationData[reservationIndex].time[avHourIndex].time = avHour.hour;
              reservationData[reservationIndex].time[avHourIndex].price = this.pricesTypesService.getMinPriceFromPriceList(priceList.prices);
              avHourIndex++;
            });
            reservationIndex++;
          });
          resolve(reservationData);
        });
      });
    });
  }

  getTimeSlotId(date: string, time: string): any {
    return this.room.id.toString() + '_' + this.timeService
      .uniqueIdByTimestamp(new Date(date + ' ' + time).toString());
  }

  getTimeList() {
    const timeList = [];
    let roomReservationIndex = 0;
    this.roomReservationData.forEach((reservationData: ReservationModel) => {
      reservationData.time.forEach((dayResInfo) => {
        timeList.push(dayResInfo.time);
      });
      roomReservationIndex++;
    });
    return timeList;
  }

  getTime(timeList: string[]) {
    timeList = timeList.slice().sort();
    let sortedTimeList: string[] = [];
    for (let i = 0; i < timeList.length - 1; i++) {
      if (timeList[i - 1] !== timeList[i]) {
        sortedTimeList.push(timeList[i]);
      }
    }
    return sortedTimeList;
  }

  ngOnInit() {
  }

  getAllRooms() {
    this.roomService.allActive().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });
  }

  onSelectRoom(room: RoomModel) {
    this.selectedRoom = room;
    this.roomReservationData = this.roomReservation(room.id);
    this.showReservationTable = true;
    this.showOrderingTable = false;
  }

  roomReservation(id: number) {
    const resData = [];
    let tmData: any[] = [];
    let dayIndex = 0;
    this.roomReservationData = this.duplicate(4, this.roomReservationData);
    for (let i = 0; i < ReservationService.RESERVATION_WEEKS_COUNT; i++) {
      resData[i] = [];
      for (let j = 0; j < ReservationService.RESERVATION_DAYS_IN_WEEKS_COUNT; j++) {
        resData[i][j] = [[]];
        tmData = [];
        tmData.push(this.setTimeSlotId(this.reservationDays[dayIndex].day, this.roomReservationData[dayIndex].time));
        resData[i][j] = resData[i][j].concat(this.roomReservationData[dayIndex], this.reservationDays[dayIndex].day, tmData);
        dayIndex++;
      }
    }
    return resData;
  }

  setTimeSlotId(day: string, time: TimeModel[]): any[] {
    let timeIndex = 0;
    let reservationData: any[] = [];
    time.forEach((tm: TimeModel) => {
      reservationData.push({
        currency: 'złoty',
        background: '#ff9200',
        time: tm.time,
        price: tm.price,
        timeSlotId: this.getTimeSlotId(day, tm.time),
        isActive: this.isReservationSlotActive(this.getTimeSlotId(day, tm.time))
      });
      timeIndex++;
    });
    return reservationData;
  }

  duplicate(count: number, data: any[]): any[] {
    const arrayToDuplicate = data;
    for (let i = 1; i <= count - 1; i++) {
      data = data.concat(arrayToDuplicate);
    }
    return data;
  }

  onSelectItem(item: ReservationModel) {
    this.reserveData = item;
    this.showOrderingTable = true;
  }
}
