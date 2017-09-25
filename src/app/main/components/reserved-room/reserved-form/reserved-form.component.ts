import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from '../../../../models/room.model';
import { OrderModel } from '../../../../models/order.model';
import { ReservationService } from '../../../../service/http/reservation.service';
import { AuthenticationService } from '../../../../service/http/authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { OrderService } from '../../../../service/http/order.service';
import { TimeService } from '../../../../service/time.service';

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

    private user$: Observable<firebase.User>;
    private user: any;

    constructor(
      private reservationService: ReservationService,
      private authService: AuthenticationService,
      private orderService: OrderService,
      private timeService: TimeService
    ) {}

    ngOnInit() {
      this.user$ = this.authService.currentUser();
      this.user$.subscribe((user: any) => {
        this.user = user;
      });
    }

    convert (day: string) {
      return this.reservationService.convertDateToString(day);
    }

    order(name, phone, email) {
      this.orderData.bookerData = {
        name: name.value,
        phone: phone.value,
        email: email.value,
        userId: ''
      };
      this.orderData.roomId = this.room.id;
      this.orderData.id = this.timeService
        .uniqueIdByTimestamp(new Date(this.reserveData.day + ' ' + this.reserveData.time.time).toString());
      this.orderData.bookerData.userId = this.user ? this.user.uid : '';
      this.orderService.addOrder(this.orderData).then((success) => {
        console.log(success);
      }, (error) => {
        console.log(error);
      });
    }
}
