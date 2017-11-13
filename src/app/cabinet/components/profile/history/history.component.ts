import {Component} from '@angular/core';
import {HistoryModel} from '../../../../models/profile/history.model';
import {HistoryService} from '../../../../service/profile/history.service';
import {ActivatedRoute} from "@angular/router";
import {UserHistoryModel} from "../../../../models/user-history.model";
import {DatePipe} from "@angular/common";
import {ReviewModel} from "../../../../models/review.model";
import {ReviewService} from "../../../../service/http/review.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  historyData: UserHistoryModel[];
  reviews: ReviewModel[] = [];

  constructor(private historyService: HistoryService,
              private activatedRoute: ActivatedRoute,
              private reviewService: ReviewService) {
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
