import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserHistoryModel } from "../../../../models/user-history.model";
import { UserHistoryService } from "../../../../service/user-history.service";
import { SwiperComponent } from "angular2-useful-swiper";

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

  currentUserHistoryId: string;

  @Output() swiper = new EventEmitter<{ swClass: any }>();
  @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private userHistoryService: UserHistoryService) {
    this.activatedRoute.data.subscribe((data) => {
      if (data['userHistory']) {
        this.historyData = this.userHistoryService.sortByExitstingPhotos(data['userHistory']);
        this.historyData.forEach((history) => {
          history.bookingDate = history.id.split('_')[1];
        });
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
          })
          .catch(() => {
            this.areErrors = false;
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

  closePopup() {
    this.areErrors = false;
    this.notificationPopupMessage = '';
    this.isShowNotificationPopup = false;
  }

  deleteImage(path: string, index: number) {

  }

  checkLastSlide(isIncrement: boolean) {
   this.lastSlide = isIncrement ? ++this.lastSlide : --this.lastSlide;
  }
}
