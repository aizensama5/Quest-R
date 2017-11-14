import {Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomService} from '../../../../service/http/room.service';
import {RoomModel} from '../../../../models/room.model';
import {CompanyModel} from '../../../../models/company.model';
import {CompanySecurityModel} from '../../../../models/company-security.model';
import {CompanyService} from '../../../../service/http/company.service';
import {GenreModel} from '../../../../models/genre.model';
import {GenreService} from '../../../../service/genre.service';
import {ComplexityModel} from '../../../../models/complexity.model';
import {ComplexityService} from '../../../../service/complexity.service';
import {MarkingModel} from '../../../../models/marking.model';
import {MarkingService} from '../../../../service/marking.service';
import {ConfigService} from '../../../../service/http/config.service';
import {LanguageModel} from "../../../../models/language.model";
import {DaysSettingsService} from "../../../../service/days-settings.service";
import {DaysModel} from "../../../../models/days.model";
import {AvailableHoursModel} from "../../../../models/available-hours.model";


@Component({
  selector: 'app-admin-rooms-edit',
  templateUrl: './admin-rooms-edit.component.html',
  styleUrls: ['./admin-rooms-edit.component.scss']
})
export class AdminRoomsEditComponent implements OnInit {
  static countSubscribing = 7;
  static defaultMaxCountOfPlayers = 8;
  maxCountOfPlayers: number;
  companyData: CompanyModel = new CompanyModel();
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));
  room: RoomModel = new RoomModel();
  genres: GenreModel[] = [];
  sGenre: GenreModel;
  sComplexity: ComplexityModel;
  complexities: ComplexityModel[] = [];
  markings: MarkingModel[] = [];
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;
  initializedItems: number;
  isShowConfirmButton = false;
  _isEverythingLoaded = false;
  useTabsetWithInput: boolean;
  useTabsetWithTextarea: boolean;
  daysSettings: DaysModel[] = [];
  _isDaySettingPacked: boolean;
  _isRoomActive: boolean;

  sliderConfig: object = {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1,
    centeredSlides: true,
    loop: false,
    speed: 1000,
    lazyLoading: true,
  };

  @Output() swiper = new EventEmitter<{ swClass: any }>();
  @ViewChild('swiperClass') swiperClass: ElementRef;

  constructor(private activeRoute: ActivatedRoute,
              public roomService: RoomService,
              public companyService: CompanyService,
              public genreService: GenreService,
              public complexityService: ComplexityService,
              public markingService: MarkingService,
              private configService: ConfigService,
              public router: Router,
              public daysSettingsService: DaysSettingsService
  ) {
    this.useTabsetWithInput = true;
    this.useTabsetWithTextarea = true;
    this.initializedItems = 0;
    this.isShowLoader = true;
  }

  ngOnInit() {
    this.activeRoute.data.subscribe((data) => {
      if (data['room']) {
        this.room = data['room'];
        this.sGenre = this.room.ganre;
        this.sComplexity = this.room.complexity;
      }
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    this.configService.maxCountOfPlayers().subscribe((count: any[]) => {
      this.maxCountOfPlayers = parseInt(count[0].$value, 10) || AdminRoomsEditComponent.defaultMaxCountOfPlayers;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    this.companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.companyData = companyData[0];
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    this.genreService.all().subscribe((genres: GenreModel[]) => {
      this.genres = genres;
      this.genres.forEach((genre: GenreModel) => {
        genre.selected = genre.id === this.sGenre.id;
      });
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    this.complexityService.all().subscribe((complexities: ComplexityModel[]) => {
      this.complexities = complexities;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    this.markingService.all().subscribe((markings: MarkingModel[]) => {
      this.markings = markings;
      this.markings.forEach((marking: MarkingModel) => {
        this.room.marking.forEach((mark: MarkingModel) => {
          if (!marking.checked) {
            marking.checked = marking.id === mark.id;
          }
        });
      });
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    this.daysSettingsService.roomDaysSettings(this.room.id).subscribe((daysSetting: DaysModel[]) => {
      this.daysSettings = daysSetting;
      this.isDaySettingsPacked();
      this.initializedItems++;
      this.isEverythingLoaded();
    });
  }

  selectedGenreById(item1: GenreModel, item2: GenreModel) {
    if (item1 && item2) {
      return item1.id === item2.id;
    }
  }

  selectedComplexityById(item1: ComplexityModel, item2: ComplexityModel) {
    if (item1 && item2) {
      return item1.id === item2.id;
    }
  }

  isEverythingLoaded() {
    if (this.initializedItems === AdminRoomsEditComponent.countSubscribing) {
      this.isShowLoader = false;
      this._isEverythingLoaded = true;
      return true;
    } else {
      return false;
    }
  }

  onImageUploaded(image: any) {
    if (!image.error && image.src) {
      this.room.img = image.src;
      this.areErrors = false;
    } else {
      this.areErrors = true;
    }
  }

  onGenreSelect() {
    this.room.ganre = this.sGenre;
  }

  onComplexitySelect() {
    this.room.complexity = this.sComplexity;
  }

  onImagesUploaded(image: any) {
    if (!image.error && image.src) {
      this.room.gallery.push({
        path: image.src
      });
      document.getElementById('swiper-wrapper-gallery')
        .setAttribute('transform', 'translate3d(0,0,0)');
      this.areErrors = false;
    } else {
      this.areErrors = true;
    }
  }

  deleteImage(path: string, index: number) {
    this.room.gallery.forEach((image: any) => {
      if (image.path === path) {
        this.room.gallery.splice(index, 1);
      }
    });
  }

  isDaySettingsPacked() {
    this._isDaySettingPacked = true;
    this.daysSettings.forEach((daySetting: DaysModel) => {
      daySetting.availableHours.forEach((avHour: AvailableHoursModel) => {
        if (!avHour.hour || !avHour.priceTypeId) {
          this._isDaySettingPacked = false;
        }
      });
    });
  }

  deleteMainImage() {
    this.room.img = '';
  }

  deleteRoom() {
    this.notificationPopupMessage = '';
    this.isShowConfirmButton = false;
    this.areErrors = false;
    this.isShowLoader = true;
    this.roomService.deleteRoom(this.room.id)
      .then(() => {
        this.router.navigate(['/admin/dashboard/rooms/'])
          .then(() => {
            this.isShowLoader = false;
            this.isShowNotificationPopup = true;
            this.notificationPopupMessage = 'Deleted';
          })
          .catch(() => {
            this.isShowLoader = false;
            this.isShowNotificationPopup = true;
            this.notificationPopupMessage = 'Ooops! Something was wrong';
          });
      })
      .catch(() => {
        this.areErrors = true;
        this.isShowLoader = false;
        this.notificationPopupMessage = 'Error';
      });
  }

  confirmDeleteRoom() {
    this.isShowConfirmButton = true;
    this.isShowNotificationPopup = true;
    this.notificationPopupMessage = 'Delete ' + this.room.name.def + '?';
  }

  save() {
    this.isShowLoader = true;
    this.areErrors = false;
    this.isRoomActivate()
      .then((isRoomActive) => {
        this.room.active = isRoomActive;
        this.room.displayOnMain = !this.room.active && this.room.displayOnMain ? this.room.active : this.room.displayOnMain;
        this.roomService.addRoom(this.room)
          .then(() => {
            this.isShowLoader = false;
            this.isShowNotificationPopup = true;
            this.notificationPopupMessage = 'Saved';
          }, () => {
            this.isShowLoader = false;
            this.areErrors = true;
            this.isShowNotificationPopup = true;
            this.notificationPopupMessage = 'Error';
          });
      });
  }

  onRoomMarkingChange(event: any, marking: MarkingModel) {
    let index = 0;
    this.room.marking = this.orderByIdASC(this.room.marking);
    if (event.target.checked) {
      this.room.marking.push(marking);
      this.sortMarkings();
    } else {
      this.room.marking.forEach((mark: MarkingModel) => {
        if (mark.id === marking.id) {
          this.sortMarkings();
          this.room.marking.splice(index, 1);
        }
        index++;
      });
    }
  }

  sortMarkings() {
    let i = 0;
    this.room.marking.forEach((mark: MarkingModel) => {
      this.room.marking[i] = mark;
      i++;
    });
  }

  orderByIdASC(roomsMarkings: MarkingModel[]): MarkingModel[] {
    return roomsMarkings.sort(function(a, b) {
      return a.id - b.id;
    });
  }

  closePopup() {
    this.isRoomActivate()
      .then((resolve) => {
        this.room.active = resolve;
      });
    this.isShowConfirmButton = false;
    this.areErrors = false;
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }

  onRoomNameTabsetChanged(tabsetInfo: LanguageModel) {
    this.room.name = tabsetInfo;
  }

  onRoomDescriptionTabsetChanged(tabsetInfo: LanguageModel) {
    this.room.description = tabsetInfo;
  }

  onRoomAddressTabsetChanged(tabsetInfo: LanguageModel) {
    this.room.address = tabsetInfo;
  }

  isRoomActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (
        this._isDaySettingPacked && this.room.complexity && this.room.countPlayers.minCountPlayers
        && this.room.countPlayers.maxCountPlayers && this.room.name.en && this.room.name.pl
        && this.room.description.en && this.room.description.pl
        && this.room.duration && this.room.img && this.room.ganre.id && this.room.level
        && this.room.address.en && this.room.address.pl && this.room.position.longitude && this.room.position.latitude
      ) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  activateRoom() {
    if (!this.room.active) {
      this.areErrors = false;
      this.isShowLoader = true;
      this.isRoomActivate()
        .then((isRoomActivate) => {
          if (isRoomActivate) {
            this.isShowLoader = false;
          } else {
            this.areErrors = true;
            this.isShowLoader = false;
            this.isShowNotificationPopup = true;
            this.notificationPopupMessage = 'Fill all data for room before activate it!';
          }
        });
    }
  }

}
