import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserHistoryModel } from "../../../../models/user-history.model";
import { ReviewModel } from "../../../../models/review.model";
import { ReviewService } from "../../../../service/http/review.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  historyData: UserHistoryModel[];
  reviews: ReviewModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService
  ) {
    this.activatedRoute.data.subscribe((data) => {
      if (data['userHistory']) {
        this.historyData = data['userHistory'];
        this.reviewService.all().subscribe((reviews: ReviewModel[]) => {
          this.historyData.forEach((hisData: UserHistoryModel) => {
            hisData.bookingDate = new Date(+hisData.id.split('_')[1]);
            hisData.review = this.reviewService.userReviewByOrderId(reviews, hisData.userId, hisData.id.split('_')[1]);
          });
        });
      }
    });
  }
}
