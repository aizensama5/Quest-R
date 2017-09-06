import { Component, Input } from '@angular/core';
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
export class ReservedFormComponent {

    @Input() room: RoomModel;
    @Input() reserveData: ReservationModel;
    @Input() showOrderingTable: boolean;
    orderData: OrderModel = new OrderModel();


    constructor(private reservationService: ReservationService) {}

    convert (day: string) {
      return this.reservationService.convertDateToString(day);
    }

    order(formData: NgForm) {
      this.orderData.bookerData = formData.value;
      this.orderData.reservationData = this.reserveData;
      // TODO this.orderData.id
      // TODO sendToApiFunction (this.orderData)
    }
}
