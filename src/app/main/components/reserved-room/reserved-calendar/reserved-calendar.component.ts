import { Component } from '@angular/core';
import { ReservationService } from '../../../../service/http/reservation.service';
import { ReservationModel } from '../../../../models/reservation.model';

@Component({
    moduleId: module.id,
    selector: 'app-main-reserved-calendar',
    templateUrl: 'reserved-calendar.component.html',
    styleUrls: ['reserved-calendar.component.scss']
})
export class ReservedCalendarComponent {
  reservationData: ReservationModel[];
  timeList = [];

  constructor(reservationService: ReservationService) {
    reservationService.all().subscribe((response) => {
      this.reservationData = response;
    });
    reservationService.getTime().subscribe((response) => {
      this.timeList = response;
    });
  }
}
