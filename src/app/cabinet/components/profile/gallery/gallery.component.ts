import {Component, EventEmitter, Output, ViewChild, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserHistoryModel} from "../../../../models/user-history.model";
import {UserHistoryService} from "../../../../service/user-history.service";
import {SwiperComponent} from "angular2-useful-swiper";
import {PhotoModel} from "../../../../models/profile/photo.model";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  static readonly countOfVisibleSlides = 5;
  historyData: UserHistoryModel[];
  sliderConfig: object;

  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  lastSlide: number;
  isShowRoomGallery = false;
  startSlide: number;
  galleryPhotos: PhotoModel[] = [];

  currentUserHistoryId: string;

  @Output() swiper = new EventEmitter<{ swClass: any }>();
  @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private userHistoryService: UserHistoryService
  ) {
    this.isShowLoader = true;
    this.activatedRoute.data.subscribe((data) => {
      if (data['userHistory']) {
        this.historyData = this.userHistoryService.sortByExitstingPhotos(data['userHistory']);
        this.historyData.forEach((history) => {
          history.bookingDate = history.id.split('_')[1];
        });
        this.isShowLoader = false;
      }
    });
  }

  ngOnInit() {
    this.sliderConfig = {
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      paginationClickable: false,
      noSwiping: false,
      slidesPerView: GalleryComponent.countOfVisibleSlides,
      loop: false,
      speed: 1000,
    };
    this.lastSlide = GalleryComponent.countOfVisibleSlides;
  }

  addPhotos(id: string) {
    this.currentUserHistoryId = id;
  }

  onImagesUploaded(image: any) {
    if (!image.error && image.src) {
      this.historyData.forEach((historyData: UserHistoryModel) => {
        if (historyData.id === this.currentUserHistoryId) {
          historyData.photos = historyData.photos ? historyData.photos : [];
          historyData.photos.push({
            path: image.src
          });
        }
      });
      document.getElementById('swiper-wrapper-user-gallery')
        .setAttribute('transform', 'translate3d(0,0,0)');
      this.areErrors = false;
    } else {
      this.areErrors = true;
    }
    this.save();
  }

  save() {
    this.isShowLoader = true;
    let index = 0;
    if (!this.areErrors) {
      this.historyData.forEach((userHistoryData: UserHistoryModel) => {
        this.userHistoryService.addUserHistory(userHistoryData)
          .then(() => {
            this.isShowLoader = false;
          })
          .catch(() => {
            this.areErrors = false;
            this.isShowLoader = false;
            this.isShowNotificationPopup = true;
            this.notificationPopupMessage = 'Something was wrong. Please, contact us!';
          });
        if (index === this.historyData.length) {
          if (this.areErrors) {
            this.isShowNotificationPopup = true;
            this.isShowLoader = false;
            this.notificationPopupMessage = 'Something was wrong. Please, contact us!';
          }
        }
      });
    } else {
      this.isShowNotificationPopup = true;
      this.isShowLoader = false;
      this.notificationPopupMessage = 'Something was wrong. Please, contact us!';
    }
  }

  onGalleryOpen(startSlide: number, galleryPhotos: PhotoModel[]) {
    this.galleryPhotos = galleryPhotos;
    this.isShowRoomGallery = true;
    this.startSlide = startSlide;
  }

  onGalleryClose(isDisplay: boolean) {
    this.isShowRoomGallery = isDisplay;
  }

  closePopup() {
    this.areErrors = false;
    this.notificationPopupMessage = '';
    this.isShowNotificationPopup = false;
  }

  deleteImage(path: string, galleryPhotoIndex: number) {
    if (this.historyData) {
      let userHistoryIndex = 0;
      this.historyData.forEach((userHistoryData: UserHistoryModel) => {
        if (userHistoryData && userHistoryData.photos) {
          userHistoryData.photos.forEach((image: any) => {
            if (image.path === path) {
              userHistoryData.photos.splice(galleryPhotoIndex, 1);
              this.refreshUserData(userHistoryIndex);
            }
          });
        }
        userHistoryIndex++;
      });
    }
  }

  refreshUserData(userHistoryIndex: number) {
    this.areErrors = false;
    this.isShowLoader = true;
    let index = 0;
    this.historyData.forEach((historyData: UserHistoryModel) => {
      if (index === userHistoryIndex) {
        this.userHistoryService.addUserHistory(historyData)
          .then(() => {
            this.isShowLoader = false;
            this.isShowNotificationPopup = true;
            this.notificationPopupMessage = 'Deleted successfully!';
            historyData.photos = historyData.photos.length ? historyData.photos : undefined;
          })
          .catch(() => {
            this.isShowLoader = false;
            this.isShowNotificationPopup = true;
            this.notificationPopupMessage = 'Error!';
            this.areErrors = true;
          })
      }
      index++;
    });
  }

  checkLastSlide(isIncrement: boolean) {
    this.lastSlide = isIncrement ? ++this.lastSlide : --this.lastSlide;
  }
}
