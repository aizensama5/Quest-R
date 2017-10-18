import {Component, OnInit} from '@angular/core';
import { ReviewModel } from '../../../models/review.model';
import { ReviewService } from '../../../service/http/review.service';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss']
})
export class AdminReviewsComponent implements OnInit {
  reviews: ReviewModel[] = [];

  constructor(
    public reviewService: ReviewService,
  ) {
    reviewService.all().subscribe((reviews: ReviewModel[]) => {
      this.reviews = reviews;
    });
  }

  ngOnInit () {
  }
}
