import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../../../service/http/room.service';
import { RoomModel } from '../../../../models/room.model';
import { CompanyModel } from '../../../../models/company.model';
import { CompanySecurityModel } from '../../../../models/company-security.model';
import { CompanyService } from '../../../../service/http/company.service';
import { GenreModel } from '../../../../models/genre.model';
import { GenreService } from '../../../../service/genre.service';
import { ComplexityModel } from '../../../../models/complexity.model';
import { ComplexityService } from '../../../../service/complexity.service';
import { MarkingModel} from '../../../../models/marking.model';
import { MarkingService } from '../../../../service/marking.service';
import { ConfigService } from '../../../../service/http/config.service';

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
  initializedItems = 0;
  sliderConfig: object;

  @Output() swiper = new EventEmitter<{swClass: any }>();
  @ViewChild('swiperClass') swiperClass: ElementRef;

  constructor (
    private activeRoute: ActivatedRoute,
    public roomService: RoomService,
    public companyService: CompanyService,
    public genreService: GenreService,
    public complexityService: ComplexityService,
    public markingService: MarkingService,
    private configService: ConfigService
  ) {
    this.isShowLoader = true;
    configService.maxCountOfPlayers().subscribe((count: any[]) => {
      this.maxCountOfPlayers = parseInt(count[0].$value, 10) || AdminRoomsEditComponent.defaultMaxCountOfPlayers;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    companyService.companyData(this.currentCompany.id).subscribe((companyData: CompanyModel[]) => {
      this.companyData = companyData[0];
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    genreService.all().subscribe((genres: GenreModel[]) => {
      this.genres = genres;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    complexityService.all().subscribe((complexities: ComplexityModel[]) => {
      this.complexities = complexities;
      this.initializedItems++;
      this.isEverythingLoaded();
    });
    markingService.all().subscribe((markings: MarkingModel[]) => {
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
      this.sliderConfig = {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 5,
        centeredSlides: true,
        loop: false,
        speed: 1000,
        lazyLoading: true,
      };
    }
  }

  onImageUploaded(image: any) {
    console.log('image');
    if (!image.error && image.src) {
      this.room.img = image.src;
      this.areErrors = false;
    } else {
      this.areErrors = true;
    }
  }

  onImagesUploaded(image: any) {
    console.log('images');
    if (!image.error && image.src) {
      this.room.gallery.push({
        path: image.src
      });
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

  ngOnInit() {
    this.activeRoute.data.subscribe((data) => {
      if (data['room']) {
        this.room = data['room'];
      }
      this.initializedItems++;
      this.isEverythingLoaded();
    });
  }

  save() {
    this.isShowLoader = true;
    this.areErrors = false;
    this.roomService.addRoom(this.room)
      .then(() => {
        this.isShowLoader = false;
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Сохранено';
      }, () => {
        this.isShowLoader = false;
        this.areErrors = true;
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Ошибка';
    });
  }

  closePopup () {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }

}
