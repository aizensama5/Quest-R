import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ReservationService } from '../../../../service/http/reservation.service';
import { ReservationModel } from '../../../../models/reservation.model';
import { TimeModel } from '../../../../models/time.model';
import {RoomModel} from '../../../../models/room.model';

@Component({
    moduleId: module.id,
    selector: 'app-main-reserved-calendar',
    templateUrl: 'reserved-calendar.component.html',
    styleUrls: ['reserved-calendar.component.scss']
})
export class ReservedCalendarComponent {

  @Output() selectedItem = new EventEmitter<ReservationModel>();
  @Input() showReservationTable: boolean;
  @Input() room: RoomModel;
  reservationData: ReservationModel[];
  timeList = [];
  timeTableItem: ReservationModel = new ReservationModel();
  resService = new ReservationService();

  constructor(reservationService: ReservationService) {
    reservationService.all().subscribe((response) => {
      this.reservationData = response;
    });
    reservationService.getTime().subscribe((response) => {
      this.timeList = response;
    });
  }

  convert (day: string) {
    return this.resService.convertDateSeparatedBySlash(day);
  }

  onSelectedItem(item: TimeModel[], day: string) {
    this.timeTableItem.time = item;
    this.timeTableItem.day = day;
    this.selectedItem.emit(this.timeTableItem);
  }
}
