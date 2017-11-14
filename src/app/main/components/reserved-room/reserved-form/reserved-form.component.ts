import {Component, Input, OnInit} from '@angular/core';
import {RoomModel} from '../../../../models/room.model';
import {OrderModel} from '../../../../models/order.model';
import {ReservationService} from '../../../../service/http/reservation.service';
import {AuthenticationService} from '../../../../service/http/authentication.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {OrderService} from '../../../../service/http/order.service';
import {TimeService} from '../../../../service/time.service';
import {ConfigService} from "../../../../service/http/config.service";
import {PricesTypesService} from "../../../../service/prices-types.service";
import {PricesTypesModel} from "../../../../models/prices-types.model";
import {DaysSettingsService} from "../../../../service/days-settings.service";
import {DaysModel} from "../../../../models/days.model";
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../../service/http/room.service";
import {AvailableHoursModel} from "../../../../models/available-hours.model";
import {PriceCountPlayersDependenceModel} from "../../../../models/price-countPlayers-dependence.model";

@Component({
  moduleId: module.id,
  selector: 'app-main-reserved-form',
  templateUrl: 'reserved-form.component.html',
  styleUrls: ['reserved-form.component.scss']
})
export class ReservedFormComponent implements OnInit {

  @Input() room: RoomModel;
  @Input() reserveData: any;
  @Input() showOrderingTable: boolean;
  orderData: OrderModel = new OrderModel();
  maxCountOfPlayers: number = 8;
  roomDaySetting: DaysModel[] = [];
  countOfPeople: number;
  pricesTypes: PricesTypesModel[] = [];

  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  scrollTarget: string = 'reserve-calendar';

  user$: Observable<firebase.User>;
  private user: any;

  constructor(private reservationService: ReservationService,
              private authService: AuthenticationService,
              private orderService: OrderService,
              private timeService: TimeService,
              public configService: ConfigService,
              public pricesTypesService: PricesTypesService,
              public daySettings: DaysSettingsService,
              private route: ActivatedRoute,
              public roomService: RoomService) {
  }

  ngOnInit() {
    if (+this.route.snapshot.params.id) {
      this.roomService.roomById(+this.route.snapshot.params.id).subscribe((room: RoomModel[]) => {
        this.room = room[0];
      });
    }
    this.pricesTypesService.all().subscribe((priceType: PricesTypesModel[]) => {
      this.pricesTypes = priceType;
    });
    this.user$ = this.authService.currentUser();
    this.user$.subscribe((user: any) => {
      this.user = user;
    });
    this.configService.maxCountOfPlayers().subscribe((count: any[]) => {
      this.maxCountOfPlayers = count[0].$value;
    });
  }

  getRoomDaySettings() {
    return new Promise((resolve) => {
      this.daySettings.roomDaysSettings(this.room.id).subscribe((roomDaySet: DaysModel[]) => {
        resolve(roomDaySet);
      });
    });
  }

  convert(day: string) {
    return this.reservationService.convertDateToString(day);
  }

  checkCountOfPlayersPriceDep() {
    this.getRoomDaySettings()
      .then((daySet: DaysModel[]) => {
        daySet.forEach((daySet: DaysModel) => {
          if (daySet.id === this.reserveData.dayId) {
            daySet.availableHours.forEach((avHour: AvailableHoursModel) => {
              if (this.reserveData.time.time === avHour.hour) {
                this.pricesTypes.forEach((priceType: PricesTypesModel) => {
                  if (priceType.id === avHour.priceTypeId) {
                    priceType.prices.forEach((countOfPlayersPriceDep: PriceCountPlayersDependenceModel) => {
                      if (countOfPlayersPriceDep.countPlayers === +this.countOfPeople) {
                        this.reserveData.time.price = countOfPlayersPriceDep.price;
                        document.getElementById('list-item-price').style.transform = 'scale(1.1)';
                        setTimeout(() => {
                          document.getElementById('list-item-price').style.transform = 'scale(1)';
                        }, 200);
                      }
                    })
                  }
                });
              }
            });
          }
        });
      });
  }

  hideFormAndScrollToReservationCalendar() {
    this.showOrderingTable = false;
    setTimeout(() => {
      this.scrollToReserveCalendar();
    }, 500);
  }

  scrollToReserveCalendar() {
    if (document.getElementById(this.scrollTarget)) {
      document.getElementById(this.scrollTarget).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  }

  closePopup() {
    if (!this.areErrors) {
      this.hideFormAndScrollToReservationCalendar();
    }
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
    this.areErrors = false;
  }

  order(name, phone, email, countOfPlayers) {
    this.areErrors = false;
    this.orderData.bookerData = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      countOfPlayers: countOfPlayers.value,
      userId: ''
    };
    this.orderData.roomId = this.room.id;
    this.orderData.id = this.room.id.toString() + '_' + this.timeService
      .uniqueIdByTimestamp(new Date(this.reserveData.day + ' ' + this.reserveData.time.time).toString());
    this.orderData.creationDate = Date.now().toString();
    this.orderData.price = this.reserveData.time.price;
    this.orderData.bookerData.userId = this.user ? this.user.uid : '';
    if (this.orderData.bookerData.name && this.orderData.bookerData.phone && this.orderData.bookerData.email && this.orderData.bookerData.countOfPlayers) {
      if (+this.orderData.bookerData.countOfPlayers && +this.orderData.bookerData.countOfPlayers <= this.room.countPlayers.maxCountPlayers && +this.orderData.bookerData.countOfPlayers >= this.room.countPlayers.minCountPlayers) {
        this.orderService.addOrder(this.orderData)
          .then(() => {
            this.isShowNotificationPopup = true;
            this.reserveData.time.isActive = false;
            this.notificationPopupMessage = 'Order was adding! Our manager contact You as soon as possible! Thank you!';
          }, () => {
            this.isShowNotificationPopup = true;
            this.areErrors = true;
            this.notificationPopupMessage = 'Something was wrong!';
          });
      } else {
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'The number of players must be in the range from ' + this.room.countPlayers.minCountPlayers + ' to ' + this.room.countPlayers.maxCountPlayers;
        this.areErrors = true;
      }
    } else {
      this.isShowNotificationPopup = true;
      this.areErrors = true;
      this.notificationPopupMessage = 'Fill all form data for order!';
    }
  }
}
