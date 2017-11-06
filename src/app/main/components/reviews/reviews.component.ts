import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../service/http/review.service';
import { PagerService } from '../../../service/pager.service';
import { UserService } from '../../../service/http/user.service';
import { UserModel } from '../../../models/user.model';

@Component({
  moduleId: module.id,
  selector: 'app-main-reviews',
  templateUrl: 'reviews.component.html',
  styleUrls: ['reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  static COUNT_REVIEW_PER_PAGE = 2;

  reviews: any[] = [];
  pager: any = {};
  pagedItems: any[];
  users: UserModel[] = [];

  constructor(private _reviewService: ReviewService,
              private _pagerService: PagerService,
              private _userService: UserService) {
  }

  ngOnInit() {
    this.getAllReviews();
  }

  getAllReviews() {
    this._reviewService.all().subscribe((reviews: any[]) => {
      this.reviews = this._reviewService.orderByIdDESC(reviews);
      this._userService.all().subscribe((users: UserModel[]) => {
        this.users = users;
        this.reviews.forEach((review: any) => {
          this.users.forEach((user: UserModel) => {
            if (user.id === review.userId) {
              review.userName = user.name;
              review.userPhoto = user.photo;
            }
          });
        });
      });

      // initialize to page 1
      this.setPage(1);
    });
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._pagerService.getPager(this.reviews.length, page, ReviewsComponent.COUNT_REVIEW_PER_PAGE);

    // get current page of items
    this.pagedItems = this.reviews.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }
}
