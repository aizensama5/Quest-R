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

@Component({
  selector: 'app-admin-rooms-edit',
  templateUrl: './admin-rooms-edit.component.html',
  styleUrls: ['./admin-rooms-edit.component.scss']
})
export class AdminRoomsEditComponent implements OnInit {
  static countSubscribing = 6;
  static defaultMaxCountOfPlayers = 8;
  maxCountOfPlayers: number;
  companyData: CompanyModel = new CompanyModel();
  currentCompany: CompanySecurityModel = JSON.parse(localStorage.getItem('admin'));
  room: RoomModel = new RoomModel();
  genres: GenreModel[] = [];
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
              public router: Router
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
    this.notificationPopupMessage = 'Delete ' + this.room.name + '?';
  }

  save() {
    this.isShowLoader = true;
    this.areErrors = false;
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
  }

  closePopup() {
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

}
