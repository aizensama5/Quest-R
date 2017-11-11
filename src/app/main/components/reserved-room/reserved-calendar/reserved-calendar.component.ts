import {Component, EventEmitter, Output, Input} from '@angular/core';
import {ReservationService} from '../../../../service/http/reservation.service';
import {ReservationModel} from '../../../../models/reservation.model';
import {TimeModel} from '../../../../models/time.model';
import {RoomModel} from '../../../../models/room.model';
import {TimeService} from "../../../../service/time.service";

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
  @Input() reservationDays: string[];
  timeTableItem: ReservationModel = new ReservationModel();
  scrollTarget: string = 'reserved-form';

  sliderConfig: Object = {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: 1,
    loop: false,
    speed: 500,
    lazyLoading: true,
  };

  constructor(public reservationService: ReservationService, public timeService: TimeService) {
  }

  convert(day: string) {
    return this.reservationService.convertDateSeparatedBySlash(day);
  }

  onSelectedItem(item: TimeModel[], day: string) {
    this.timeTableItem.time = item;
    this.timeTableItem.day = day;
    this.selectedItem.emit(this.timeTableItem);
    this.scrollToReserveForm();
  }

  scrollToReserveForm() {
    if (document.getElementById(this.scrollTarget)) {
      document.getElementById(this.scrollTarget).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  }
}
