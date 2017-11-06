import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomModel} from '../../../models/room.model';
import {DaysSettingsService} from '../../../service/days-settings.service';
import {DaysModel} from '../../../models/days.model';
import {PricesTypesModel} from '../../../models/prices-types.model';
import {PricesTypesService} from '../../../service/prices-types.service';
import {AvailableHoursModel} from '../../../models/available-hours.model';

@Component({
  selector: 'app-days-settings',
  templateUrl: './days-settings.component.html',
  styleUrls: ['./days-settings.component.scss']
})
export class DaysSettingsComponent implements OnInit {
  static countSubscribing = 2;
  room: RoomModel = new RoomModel();
  daysSettings: DaysModel[] = [];
  priceTypes: PricesTypesModel[] = [];
  weekDays: any[] = [];
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  initializedItems = 0;
  options: any = {
    o_copy: 'copy_',
    o_delete: 'delete_'
  };
  areErrors: boolean;
  dayIdToDelete: number;
  hourIdToDelete: number;

  constructor(protected activateRoute: ActivatedRoute,
              protected daysSettingsService: DaysSettingsService,
              protected priceTypeService: PricesTypesService) {
  }

  ngOnInit() {
    this.isShowLoader = true;
    this.weekDays = DaysSettingsService.weekDays;
    this.activateRoute.data.subscribe((data) => {
      if (data['room']) {
        this.room = data['room'];
        this.getDaysSettings();
      }
    });
    this.priceTypeService.all().subscribe((priceTypes: PricesTypesModel[]) => {
      this.priceTypes = priceTypes;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
  }

  getDaysSettings() {
    this.daysSettingsService.roomDaysSettings(this.room.id).subscribe((daysSetting: DaysModel[]) => {
      this.daysSettings = daysSetting;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
  }

  onAvHourTypeChange(daySettingId: number, availableHourId: number, priceTypeId: number) {
    let i = 0;
    for (; i < this.daysSettings.length; i++) {
      if (!this.daysSettings[i] || this.daysSettings[i].id !== daySettingId) {
        continue;
      }
      if (this.daysSettings[i].id = daySettingId && this.daysSettings[i].id) {
        let j = 0;
        for (; j < this.daysSettings[i].availableHours.length; j++) {
          if (!this.daysSettings[i].availableHours[j]) {
            continue;
          }
          if (this.daysSettings[i].availableHours[j].id === availableHourId && this.daysSettings[i].availableHours[j].id) {
            this.daysSettings[i].availableHours[j].priceTypeId = priceTypeId;
          }
        }
      }
    }
  }

  initializate() {
    this.daysSettings.forEach((daySet: DaysModel) => {
      daySet.availableHours = [
        {
          id: null,
          hour: '',
          priceTypeId: null
        }
      ];
    });
  }

  addHour(dayId: number) {
    this.daysSettings.forEach((daySetting: DaysModel) => {
      if (daySetting.id === dayId) {
        daySetting.availableHours.push(new AvailableHoursModel());
        return;
      }
    });
  }

  confirmDeleteHour(dayId: number, hourId: number, dayIndex?: number, hourIndex?: number) {
    if (!dayId || !hourId) {
      this.daysSettings.forEach((daySetting: DaysModel) => {
        if (daySetting.id === dayIndex+1) {
          daySetting.availableHours.splice(hourIndex, 1);
        }
      });
    } else {
      this.dayIdToDelete = dayId;
      this.hourIdToDelete = hourId;
      this.isShowNotificationPopup = true;
      this.notificationPopupMessage = 'Are you sure?';
    }
  }

  deleteHour(dayIdToDelete, hourIdToDelete) {
    this.isShowLoader = true;
    this.daysSettings = [];
    this.daysSettingsService.removeHourItem(this.room.id, dayIdToDelete, hourIdToDelete)
      .then(() => {
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Deleted successfully!';
        this.isShowLoader = false;
      }, () => {
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Error';
        this.isShowLoader = false;
        this.daysSettings = [];
      });
    this.hourIdToDelete = null;
    this.dayIdToDelete = null;
  }

  isEverythingLoaded() {
    if (this.initializedItems >= DaysSettingsComponent.countSubscribing) {
      this.isShowLoader = false;
    }
  }

  closePopup() {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }

  onSelectedOption(option: any, daySetToId: number) {
    const opt: any = option.target.value;
    const separator = '_';
    const optAppointment: string = opt.split(separator).shift() + separator;
    const daySetFromId: number = +opt.split(separator).pop();
    switch (optAppointment) {
      case this.options.o_copy:
        this.copyDaySettings(daySetFromId, daySetToId);
        break;
      case this.options.o_delete:
        this.deleteDaySettings(daySetToId);
        break;
      default:
        this.getDaysSettings();
    }
  }

  weekDaySettings(weekId: number): AvailableHoursModel[] {
    let avHours: AvailableHoursModel[] = [];
    this.daysSettings.forEach((wDay: DaysModel) => {
      if (weekId === wDay.id) {
        avHours = wDay.availableHours;
      }
    });
    return avHours;
  }

  deleteDaySettings(dayId: number) {
    let dayIndex = 0;
    this.daysSettings.forEach((wDay: DaysModel) => {
      if (wDay.id === dayId) {
        this.daysSettings[dayIndex].availableHours = [];
      }
      dayIndex++;
    });
  }

  copyDaySettings(fromId: number, toId: number) {
    let dayIndex = 0;
    this.daysSettings.forEach((wDay: DaysModel) => {
      if (wDay.id === toId) {
        this.daysSettings[dayIndex].availableHours = this.weekDaySettings(fromId);
      }
      dayIndex++;
    });
  }

  resetDaySettings(dayId: number) {
    let dayIndex = 0;
    this.daysSettings.forEach((wDay: DaysModel) => {
      if (wDay.id === dayId) {
        this.daysSettings[dayIndex].availableHours = this.weekDaySettings(dayId);
      }
      dayIndex++;
    });
  }

  save() {
    let subscrCount = 0;
    this.areErrors = false;
    this.isShowLoader = true;
    this.daysSettings.forEach((daySetting: DaysModel) => {
      this.daysSettingsService.addDaySetting(daySetting).then(() => {
      }, () => {
        this.areErrors = true;
      });
      subscrCount++;
      if (subscrCount === this.daysSettings.length) {
        this.showPopup();
      }
    });
  }

  showPopup() {
    if (!this.areErrors) {
      this.isShowLoader = false;
      this.isShowNotificationPopup = true;
      this.notificationPopupMessage = 'Saved successfully!';
    } else {
      this.areErrors = true;
      this.isShowNotificationPopup = true;
      this.isShowLoader = false;
      this.notificationPopupMessage = 'Error!';
    }
  }
}
