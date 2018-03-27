import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {ReservationService} from '../../../../service/http/reservation.service';
import {ReservationModel} from '../../../../models/reservation.model';
import {TimeModel} from '../../../../models/time.model';
import {RoomModel} from '../../../../models/room.model';
import {TimeService} from '../../../../service/time.service';
import {DatepickerOptions} from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import * as mainReducer from '../../../../reducers';
import {Store} from '@ngrx/store';

@Component({
  moduleId: module.id,
  selector: 'app-main-reserved-calendar',
  templateUrl: 'reserved-calendar.component.html',
  styleUrls: ['reserved-calendar.component.scss']
})
export class ReservedCalendarComponent implements OnInit {

  @Output() selectedItem = new EventEmitter<ReservationModel>();
  @Input() showReservationTable: boolean;
  @Input() room: RoomModel;
  @Input() roomReservationData: any[];
  @Input() timeList;
  @Input() reservationDays: string[];
  @Input() mobileReservationDays: string[];
  @Input() isMobile: boolean;
  @Input() isFormSubmited: boolean;
  timeTableItem: ReservationModel = new ReservationModel();
  scrollTarget = 'reserved-form';
  mobileDateTimeData = {};
  mobileTimeList = [];
  mobileTimeOptions = [];
  selectedDatePickerDate = null;
  mobileSelectedTime: string;

  options: DatepickerOptions = {
    minYear: 2018,
    maxYear: 2030,
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    minDate: new Date(Date.now() - 1 * 24 * 3600 * 1000), // Minimal selectable date
    maxDate: new Date(Date.now() + 27 * 24 * 3600 * 1000),  // Maximal selectable date (+28 days)
    barTitleIfEmpty: 'Click to select a date'
  };

  isDisplayMobileTimeList = false;

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

  constructor(public reservationService: ReservationService,
              public timeService: TimeService,
              private store: Store<mainReducer.State>) {
    this.onSelectRoom();
    this.checkIsFormSubmited();
  }

  checkIsFormSubmited() {
    this.reservationDays = this.isFormSubmited ? [] : this.reservationDays;
    this.isDisplayMobileTimeList = this.isFormSubmited;
  }

  ngOnInit() {}

  convert(day: string) {
    return this.reservationService.convertDateSeparatedBySlash(day);
  }

  onSelectedItem(item: TimeModel[], day: string, dayId: number) {
    this.timeTableItem.time = item;
    this.timeTableItem.day = day;
    this.timeTableItem.dayId = dayId;
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

  getTimeListByDayId(dayId, weekId) {
    return this.roomReservationData[weekId].filter((resData) => resData[1].dayId === dayId)[0][3];
  }

  onSelectedDateMobile() {
    this.mobileDateTimeData = this.getMobileDateTimeData();
    this.mobileTimeList = this.getTimeListByDayId(this.mobileDateTimeData['dayId'], this.mobileDateTimeData['weekId']);
    this.prepareTimeOptions();
    this.isDisplayMobileTimeList = true;
  }

  prepareTimeOptions() {
    this.mobileTimeOptions = [];
    this.mobileTimeList.forEach((timeItem) => {
      console.log(timeItem);
      if (timeItem.isActive) {
        this.mobileTimeOptions.push({value: timeItem.timeSlotId, label: timeItem.time});
      }
    });
  }

  getMobileDateTimeData() {
    let mobileDateTimeData = {};
    this.mobileReservationDays.forEach((day) => {
      if (this.timeService.uniqueIdByTimestamp(day['day']) === this.timeService.uniqueIdByTimestamp(this.selectedDatePickerDate)) {
        mobileDateTimeData = day;
      }
    });

    return mobileDateTimeData;
  }

  onSelectedTimeMobile() {
    this.timeTableItem.dayId = this.mobileDateTimeData['dayId'];
    this.timeTableItem.day = this.mobileDateTimeData['day'];
    this.timeTableItem.time = this.getTimeByTimeSlotId(this.mobileSelectedTime);
    this.selectedItem.emit(this.timeTableItem);
  }

  onSelectRoom() {
    this.store.select(mainReducer.getRoom).subscribe((room: RoomModel) => {
      if (room && this.mobileDateTimeData.hasOwnProperty('dayId')) {
        this.isDisplayMobileTimeList = false;
      }
    });
  }

  getTimeByTimeSlotId(timeSlotId: string) {
    return this.mobileTimeList.filter((timeItem) => timeItem.timeSlotId === timeSlotId)[0];
  }
}
