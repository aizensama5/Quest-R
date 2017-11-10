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

  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  user$: Observable<firebase.User>;
  private user: any;

  constructor(private reservationService: ReservationService,
              private authService: AuthenticationService,
              private orderService: OrderService,
              private timeService: TimeService,
              public configService: ConfigService,
              public pricesTypesService: PricesTypesService,
              public daySettings: DaysSettingsService
  ) {}

  ngOnInit() {
    this.user$ = this.authService.currentUser();
    this.user$.subscribe((user: any) => {
      this.user = user;
    });
    this.configService.maxCountOfPlayers().subscribe((count: any[]) => {
      this.maxCountOfPlayers = count[0].$value;
    });
    this.pricesTypesService.all().subscribe((priceType: PricesTypesModel[]) => {
      this.daySettings.roomDaysSettings(this.room.id).subscribe((roomDaySet: DaysModel[]) => {
        this.roomDaySetting = roomDaySet;
      });
    });
  }


  convert(day: string) {
    return this.reservationService.convertDateToString(day);
  }

  checkCountOfPlayersPriceDep(countOfPlayers: any) {

  }

  closePopup() {
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
    this.isShowNotificationPopup = true;
    if (this.orderData.bookerData.name && this.orderData.bookerData.phone && this.orderData.bookerData.email && this.orderData.bookerData.countOfPlayers) {
      if (this.orderData.bookerData.countOfPlayers <= this.maxCountOfPlayers) {
        this.orderService.addOrder(this.orderData)
          .then(() => {
            this.reserveData.time.isActive = false;
            this.notificationPopupMessage = 'Order was adding! Our manager contact You as soon as possible! Thank you!';
          }, () => {
            this.areErrors = true;
            this.notificationPopupMessage = 'Something was wrong!';
          });
      } else {
        this.notificationPopupMessage = 'Maximum count of players: ' + this.maxCountOfPlayers;
        this.areErrors = true;
      }
    } else {
      this.areErrors = true;
      this.notificationPopupMessage = 'Fill all form data for order!';
    }
  }
}
