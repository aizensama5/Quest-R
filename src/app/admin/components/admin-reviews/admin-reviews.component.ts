import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ReviewModel } from '../../../models/review.model';
import { ReviewService } from '../../../service/http/review.service';
import 'datatables.net';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.scss']
})
export class AdminReviewsComponent implements AfterViewInit {
  reviews: ReviewModel[] = [];

  private initDatatable() {
    const reviewTable: any = $('#review-table');
    reviewTable.DataTable({
      select: true
    });
  }

  constructor(
    public reviewService: ReviewService
  ) {
    reviewService.all().subscribe((reviews: ReviewModel[]) => {
      this.reviews = reviews;
    });
  }

  ngAfterViewInit() {
    this.initDatatable();
  }
}
