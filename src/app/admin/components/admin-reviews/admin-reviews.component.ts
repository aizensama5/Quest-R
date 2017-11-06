import { Component, OnInit } from '@angular/core';
import { ReviewModel } from '../../../models/review.model';
import { ReviewService } from '../../../service/http/review.service';
import { UserModel } from "../../../models/user.model";

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss']
})
export class AdminReviewsComponent implements OnInit {
  reviews: ReviewModel[] = [];
  isShowLoader: boolean;
  users: UserModel[] = [];
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  constructor(
    public reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.isShowLoader = true;
    this.reviewService.all().subscribe((reviews: ReviewModel[]) => {
      this.reviews = reviews;
      this.isShowLoader = false;
    });
  }

  save() {
    this.isShowLoader = true;
    this.reviewService.changeReviews(this.reviews)
      .then(() => {
        this.isShowLoader = false;
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Saved';
        this.areErrors = false;
      })
      .catch(() => {
        this.isShowLoader = false;
        this.isShowNotificationPopup = true;
        this.notificationPopupMessage = 'Error!';
        this.areErrors = true;
      });
  }

  closePopup() {
    this.areErrors = false;
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }
}
