import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../service/http/review.service';
import { Review } from '../../../models/review.model';
import { PagerService } from '../../../service/pager.service';

@Component({
    moduleId: module.id,
    selector: 'app-main-reviews',
    templateUrl: 'reviews.component.html',
    styleUrls: ['reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

    static COUNT_REVIEW_PER_PAGE = 2;

    reviews: Review[] = [];
    pager: any = {};
    pagedItems: any[];

    constructor(
        private _reviewService: ReviewService,
        private _pagerService: PagerService
    ) {}

    ngOnInit() {
        this.getAllReviews();
    }

    getAllReviews() {
        this._reviewService.all().subscribe((reviews: Review[]) => {
           this.reviews = reviews;

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
