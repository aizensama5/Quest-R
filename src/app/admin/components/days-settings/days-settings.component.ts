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
      this.daysSettings.forEach((daySet: DaysModel) => {
        if (!daySet.availableHours || !daySet.availableHours.length) {
          daySet.availableHours = [
            {
              id: 1,
              hour: '',
              priceTypeId: null
            }
          ];
        }
      });
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
          id: 1,
          hour: '',
          priceTypeId: null
        }
      ];
    });
  }

  addHour(dayId: number) {
    const lastId = this.getLastDaysSettingsId();
    this.daysSettings.forEach((daySetting: DaysModel) => {
      if (daySetting.id === dayId) {
        const newAvHour: AvailableHoursModel = {
          id: lastId,
          hour: '',
          priceTypeId: null
        };
        daySetting.availableHours.push(newAvHour);
        return;
      }
    });
  }

  getLastDaysSettingsId(): number {
    let ids: number[] = [];
    this.daysSettings.forEach((daySetting: DaysModel) => {
      daySetting.availableHours.forEach((avHour: AvailableHoursModel) => {
        ids.push(avHour.id);
      });
    });
    return Math.max.apply(null, ids) + 1;
  }

  deleteHour(dayIdToDelete: number, hourIdToDelete: number) {
    this.daysSettings.forEach((daySetting: DaysModel) => {
      if (daySetting.id === dayIdToDelete) {
        let avHourIndex = 0;
        daySetting.availableHours.forEach((avHour: AvailableHoursModel) => {
          if (avHour.id === hourIdToDelete) {
            daySetting.availableHours.splice(avHourIndex, 1);
          }
          avHourIndex++;
        });
      }
    });
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
