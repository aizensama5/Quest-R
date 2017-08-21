import { Component, Input } from '@angular/core';
import { ProfileReviewModel } from '../../../../../models/profile/profileReview.model';
@Component({
    moduleId: module.id,
    selector: 'app-cabinet-review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.scss']
})
export class ReviewComponent {
    @Input() profileReview: ProfileReviewModel;
}
