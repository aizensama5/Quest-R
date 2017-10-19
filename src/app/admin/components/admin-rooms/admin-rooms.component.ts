import { Component, OnInit } from '@angular/core';
import { CompanyModel} from '../../../models/company.model';
import { CompanySecurityModel } from '../../../models/company-security.model';
import { CompanyService } from '../../../service/http/company.service';
import { RoomService } from '../../../service/http/room.service';
import { RoomModel } from '../../../models/room.model';
import { DaysSettingsService } from '../../../service/days-settings.service';
import { DaysModel } from '../../../models/days.model';

@Component({
  selector: 'app-admin-rooms',
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.scss']
})
export class AdminRoomsComponent implements OnInit {
  static countSubscribing = 3;
  companyData: CompanyModel = new CompanyModel();
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));
  rooms: RoomModel[] = [];
  allRooms: RoomModel[] = [];
  newRoom: RoomModel = new RoomModel();
  daySettings: DaysModel = new DaysModel();
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;
  initializedItems = 0;

  constructor(
    private companyService: CompanyService,
    public roomService: RoomService,
    protected daysSettingsService: DaysSettingsService
  ) {
    this.isShowLoader = true;
    companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.companyData = companyData[0];
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    roomService.roomsByCompanyId(this.currentCompany.id).subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    this.roomService.all().subscribe((rooms: RoomModel[]) => {
      this.allRooms = rooms;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
  }

  ngOnInit() {
  }

  isEverythingLoaded() {
    if (this.initializedItems === AdminRoomsComponent.countSubscribing) {
      this.isShowLoader = false;
    }
  }

  generateDaysSetting() {
    DaysSettingsService.weekDays.forEach((weekDay: any) => {
      this.daySettings = {
        id: weekDay.id,
        roomId: this.newRoom.id,
        weekDay: weekDay.weekDay,
        availableHours: [
          {
            id: 1,
            hour: '',
            priceTypeId: null
          }
        ]
      };
      this.daysSettingsService.addDaySetting(this.daySettings).then();
    });
  }

  closePopup () {
    this.areErrors = false;
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }

  addNewRoom(roomName: string) {
    this.isShowLoader = true;
    this.areErrors = false;
    if (roomName.length) {
      this.newRoom.id = this.roomService.lastId(this.allRooms) + 1;
      this.newRoom.name = roomName;
      this.newRoom.companyId = this.currentCompany.id;
      this.rooms.push(this.newRoom);
      this.roomService.addRoom(this.newRoom)
        .then(() => {
          this.generateDaysSetting();
          this.isShowLoader = false;
          this.isShowNotificationPopup = true;
          this.notificationPopupMessage = 'Сохранено';
          this.newRoom = new RoomModel();
        })
        .catch(() => {
          this.areErrors = true;
          this.isShowLoader = false;
          this.isShowNotificationPopup = true;
          this.notificationPopupMessage = 'Ошибка при сохранении';

        });
    } else {
      this.areErrors = true;
      this.isShowLoader = false;
      this.isShowNotificationPopup = true;
      this.notificationPopupMessage = 'Минимальная длина названия: 1 символ';
    }
  }
}
