import {Component, Input, OnInit, Output} from '@angular/core';
import {RoomModel} from '../../../models/room.model';
import {RoomService} from '../../../service/http/room.service';
import {ReservationModel} from '../../../models/reservation.model';
import {ReservationService} from '../../../service/http/reservation.service';
import {MainReservationModel} from '../../../models/main-reservation.model';
import * as mainReducer from '../../../reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
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

@Component({
  moduleId: module.id,
  selector: 'app-main-reserved-room',
  templateUrl: 'reserved-room.component.html',
  styleUrls: ['reserved-room.component.scss']
})
export class ReservedRoomComponent implements OnInit {

  @Input() title: string;
  selectedRoom: RoomModel = new RoomModel();
  allReservationData: MainReservationModel[];
  roomReservationData: ReservationModel[] = [];
  reservationData: ReservationModel[] = [];
  rooms: RoomModel[] = [];
  timeList = [];
  room: RoomModel = new RoomModel();
  reserveData: ReservationModel = new ReservationModel();
  showReservationTable = false;
  showOrderingTable = false;
  selectedRoom$: Observable<RoomModel>;
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
              public orderService: OrderService
  ) {
    this.getAllRooms();
    this.store.select(mainReducer.getRoom).subscribe((room: RoomModel) => {
      if (room) {
        this.room = room;
        this.generateReservationTable()
          .then((reservationData: ReservationModel[]) => {
            this.orderService.roomOrders(this.room.id).subscribe((roomOrders: OrderModel[]) => {
              this.roomOrders = roomOrders;
            });
            this.reservationDays = reservationService.days();
            this.currentDayOfWeek = reservationService.getCurrentDayOfWeek(this.reservationDays[0].day);
            this.roomReservationData = reservationService.prepareReservationData(reservationData, this.currentDayOfWeek);
            this.timeList = this.getTime(this.getTimeList());
            this.onSelectRoom(room);
          });

      }
    });
    this.roomId = parseInt(this.route.snapshot.params.id, 10);
    this.isOpenedRoomPage = !!this.roomId;
    if (this.isOpenedRoomPage) {
      this.roomService.roomById(this.roomId).subscribe((room: RoomModel[]) => {
        this.onSelectRoom(room[0]);
      });
    }
  }

  isReservationSlotActive(timeSlotId: number): boolean {
    let isActive: boolean = true;
    if (this.timeService.uniqueIdByTimestamp() > timeSlotId) {
      isActive = false;
    } else {
      this.roomOrders.forEach((roomOrder: OrderModel) => {
        console.log(roomOrder.id + '+' + this.room.id + timeSlotId);
        if (roomOrder.id === timeSlotId) {
          console.log('here');
          isActive = false;
        }
      });
    }
    console.log(isActive);
    return isActive;
  }

  generateReservationTable(): Promise<ReservationModel[]> {
    return new Promise((resolve) => {
      this.daysSettingsService.roomDaysSettings(this.room.id).subscribe((daysSettings: DaysModel[]) => {
        this.pricesTypesService.all().subscribe((priceType: PricesTypesModel[]) => {
          let reservationIndex = 0;
          daysSettings.forEach((daySetting: DaysModel) => {
            this.reservationData[reservationIndex] = new ReservationModel();
            this.reservationData[reservationIndex].dayId = daySetting.id;
            this.reservationData[reservationIndex].day = daySetting.weekDay;
            let avHourIndex = 0;
            daySetting.availableHours.forEach((avHour: AvailableHoursModel) => {
              this.reservationData[reservationIndex].time[avHourIndex] = new TimeModel();
              const priceList = this.pricesTypesService.getPriceTypeByPriceTypeId(priceType, avHour.priceTypeId);
              this.reservationData[reservationIndex].time[avHourIndex].time = avHour.hour;
              this.reservationData[reservationIndex].time[avHourIndex].price = this.pricesTypesService.getMinPriceFromPriceList(priceList.prices);
              avHourIndex++;
            });
            reservationIndex++;
          });
          resolve(this.reservationData);
        });
      });
    });
  }

  getTimeSlotId(date: string, time: string): any {
    return this.room.id + this.timeService
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
    let dayIndex = 0;
    let timeIndex = 0;
    this.reservationData = this.duplicate(4, this.reservationData);
    for (let i = 0; i < ReservationService.RESERVATION_WEEKS_COUNT; i++) {
      resData[i] = [];
      for (let j = 0; j < ReservationService.RESERVATION_DAYS_IN_WEEKS_COUNT; j++) {
        resData[i][j] = [[]];
        this.reservationData[dayIndex].time.forEach((tm: TimeModel) => {
          tm.timeSlotId = this.getTimeSlotId(this.reservationDays[dayIndex].day, tm.time);
          tm.isActive = this.isReservationSlotActive(tm.timeSlotId);
          timeIndex++;
        });
        resData[i][j] = resData[i][j].concat(this.reservationData[dayIndex], this.reservationDays[dayIndex].day);
        dayIndex++;
      }
    }
    return resData;
  }

  setTimeSlotId(dayIndex: number, day: string, time: TimeModel[]): Promise<ReservationModel> {
    return new Promise((resolve) => {
      const timeList = this.getTime(this.getTimeList());
      let timeIndex = 0;
      time.forEach((tm: TimeModel) => {
        this.reservationData[dayIndex].time[timeIndex].timeSlotId = this.getTimeSlotId(day, tm.time);
        timeIndex++;
      });
      resolve(this.reservationData[dayIndex]);
    });
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
