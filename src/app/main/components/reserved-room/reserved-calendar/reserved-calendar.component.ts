import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ReservationService } from '../../../../service/http/reservation.service';
import { ReservationModel } from '../../../../models/reservation.model';
import { MainReservationModel } from '../../../../models/main-reservation.model';
import { TimeModel } from '../../../../models/time.model';
import { RoomModel } from '../../../../models/room.model';

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
  @Input() roomReservationData: ReservationModel[];
  @Input() timeList;
  timeTableItem: ReservationModel = new ReservationModel();

  constructor(private reservationService: ReservationService) {}

  convert (day: string) {
    return this.reservationService.convertDateSeparatedBySlash(day);
  }

  onSelectedItem(item: TimeModel[], day: string) {
    this.timeTableItem.time = item;
    this.timeTableItem.day = day;
    this.selectedItem.emit( this.timeTableItem);
  }
}
