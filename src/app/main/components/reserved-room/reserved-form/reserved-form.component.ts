import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from '../../../../models/room.model';
import { ReservationModel } from '../../../../models/reservation.model';
import { NgForm } from '@angular/forms';
import { OrderModel } from '../../../../models/order.model';
import { ReservationService } from '../../../../service/http/reservation.service';

@Component({
    moduleId: module.id,
    selector: 'app-main-reserved-form',
    templateUrl: 'reserved-form.component.html',
    styleUrls: ['reserved-form.component.scss']
})
export class ReservedFormComponent implements OnInit {

    @Input() room: RoomModel;
    @Input() reserveData: ReservationModel;
    @Input() showOrderingTable: boolean;
    orderData: OrderModel = new OrderModel();
    resService = new ReservationService();

    ngOnInit() {
    }

    convert (day: string) {
      return this.resService.convertDateToString(day);
    }

    order(formData: NgForm) {
      this.orderData.bookerData = formData.value;
      this.orderData.reservationData = this.reserveData;
      // TODO this.orderData.id
      // TODO sendToApiFunction (this.orderData)
    }
}
