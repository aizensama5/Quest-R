import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-main-review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.scss']
})
export class ReviewComponent {
    @Input() review: any;
}
