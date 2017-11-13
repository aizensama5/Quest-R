import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RoomModel} from "../../../../models/room.model";
import {OrderModel} from "../../../../models/order.model";
import {UserHistoryModel} from "../../../../models/user-history.model";
import {UserHistoryService} from "../../../../service/user-history.service";

@Component({
  selector: 'app-admin-bookings-edit',
  templateUrl: './admin-bookings-edit.component.html',
  styleUrls: ['./admin-bookings-edit.component.scss']
})
export class AdminBookingsEditComponent implements OnInit {
  room: RoomModel = new RoomModel();
  order: OrderModel = new OrderModel();
  userHistory: UserHistoryModel = new UserHistoryModel();
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

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

  constructor(private activateRoute: ActivatedRoute,
              private userHistoryService: UserHistoryService) {
    this.isShowLoader = true;
    this.activateRoute.data.subscribe((data) => {
      console.log(data['order']);
      if (data['order']) {
        this.order = data['order'];
        this.userHistoryService.getRoomHistoryById(this.order.roomId, this.order.id)
          .subscribe((userHistory: UserHistoryModel[]) => {
            this.userHistory = userHistory.length ? userHistory[0] : this.userHistory;
            this.isShowLoader = false;
          })
      }
    });
  }

  onImagesUploaded(image: any) {
    if (!image.error && image.src) {
      this.userHistory.photos.push({
        path: image.src
      });
      if (document.getElementById('swiper-wrapper-user-gallery')) {
        document.getElementById('swiper-wrapper-user-gallery')
          .setAttribute('transform', 'translate3d(0,0,0)');
      }
      this.areErrors = false;
    } else {
      this.areErrors = true;
    }
  }

  deleteImage(path: string, index: number) {
    this.userHistory.photos.forEach((image: any) => {
      if (image.path === path) {
        this.userHistory.photos.splice(index, 1);
      }
    });
  }

  save() {
    this.areErrors = false;
    this.isShowLoader = true;
    this.userHistory.id = this.order.id;
    this.userHistory.roomId = this.order.roomId;
    this.userHistory.userId = this.order.bookerData.userId;
    this.userHistoryService.addUserHistory(this.userHistory)
      .then(() => {
        this.isShowLoader = false;
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Saved successfully!';
      })
      .catch(() => {
        this.areErrors = true;
        this.isShowLoader = false;
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Error!';
      })
  }

  closePopup() {
    this.areErrors = false;
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }

  ngOnInit() {
  }

}
