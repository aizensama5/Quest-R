import { Component, OnInit } from '@angular/core';
import { ProfileReviewModel } from '../../../../models/profile/profileReview.model';
import { ProfileReviewService } from '../../../../service/profile/profileReview.service';
import { PagerService } from '../../../../service/pager.service';

@Component({
  selector: 'app-cabinet-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  static COUNT_REVIEW_PER_PAGE = 2;
  reviewsData: ProfileReviewModel[] = [];
  pager: any = {};
  profilePagedItems: any[];

  constructor(
    private profileReviewService: ProfileReviewService,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.getReviewsData();
  }

  getReviewsData() {
    this.profileReviewService.all().subscribe((revData) => {
      this.reviewsData = revData;
      // initialize to page 1
      this.setPage(1);
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.reviewsData.length, page, ReviewsComponent.COUNT_REVIEW_PER_PAGE);

    // get current page of items
    this.profilePagedItems = this.reviewsData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
