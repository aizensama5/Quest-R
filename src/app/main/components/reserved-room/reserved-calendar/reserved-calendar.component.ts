import {Component, EventEmitter, Output} from '@angular/core';
import { ReservationService } from '../../../../service/http/reservation.service';
import { ReservationModel } from '../../../../models/reservation.model';
import {TimeModel} from '../../../../models/time.model';

@Component({
    moduleId: module.id,
    selector: 'app-main-reserved-calendar',
    templateUrl: 'reserved-calendar.component.html',
    styleUrls: ['reserved-calendar.component.scss']
})
export class ReservedCalendarComponent {
  reservationData: ReservationModel[];
  timeList = [];
  selectedItem: ReservationModel = new ReservationModel();
  @Output() onSelectItem = new EventEmitter<ReservationModel>();

  constructor(reservationService: ReservationService) {
    reservationService.all().subscribe((response) => {
      this.reservationData = response;
    });
    reservationService.getTime().subscribe((response) => {
      this.timeList = response;
    });
  }

  onSelectedItem(item: TimeModel[], day: string) {
    this.selectedItem.time = item;
    this.selectedItem.day = day;
    this.onSelectItem.emit(this.selectedItem);
  }
}
