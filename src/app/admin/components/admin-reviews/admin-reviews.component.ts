import { Component, OnInit } from '@angular/core';
import { ReviewModel } from '../../../models/review.model';
import { ReviewService } from '../../../service/http/review.service';
import { UserService } from "../../../service/http/user.service";
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

  constructor(public reviewService: ReviewService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.isShowLoader = true;
    this.reviewService.all().subscribe((reviews: ReviewModel[]) => {
      this.reviews = reviews;
      this.isShowLoader = false;
      console.log(this.reviews);
    });
  }
}
