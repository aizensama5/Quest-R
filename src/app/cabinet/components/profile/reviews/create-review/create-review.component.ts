import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RoomService} from '../../../../../service/http/room.service';
import {RoomModel} from '../../../../../models/room.model';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AuthenticationService} from '../../../../../service/http/authentication.service';
import {ReviewService} from '../../../../../service/http/review.service';
import {ReviewModel} from '../../../../../models/review.model';
import {UserHistoryModel} from "../../../../../models/user-history.model";
import {UserHistoryService} from "../../../../../service/user-history.service";

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent {
  user$: Observable<firebase.User>;
  user: any;
  newReview: ReviewModel = new ReviewModel;
  allReviews: ReviewModel[] = [];
  datesOfVisit: any[] = [];
  @Input() rooms: RoomModel[];
  @Input() userHistories: UserHistoryModel[];
  @Output() onNewReviewAdded: EventEmitter<ReviewModel> = new EventEmitter<ReviewModel>();


  constructor(public roomService: RoomService,
              private authService: AuthenticationService,
              public reviewService: ReviewService,
              private userHistoryService: UserHistoryService) {
    this.user$ = authService.currentUser();
    this.user$.subscribe((user: any) => {
      this.user = user;
    });
    reviewService.all().subscribe((reviews: ReviewModel[]) => {
      this.allReviews = reviews;
    });
  }

  onRoomSelected() {
    this.datesOfVisit = [];
    if (+this.newReview.roomId) {
      this.userHistoryService.getAvailableUserHistoryByRoomId(this.userHistories, +this.newReview.roomId)
        .then((userHistoriesByRoomId: UserHistoryModel[]) => {
          userHistoriesByRoomId.forEach((userHistoryByRoomId: UserHistoryModel) => {
            this.datesOfVisit.push(+userHistoryByRoomId.id.split('_')[1]);
          });
        });
    }
  }

  save() {
    this.newReview.id = this.reviewService.lastId(this.allReviews) + 1;
    this.newReview.userId = this.user.uid;
    this.newReview.created = +Date.now();
    this.reviewService.addReview(this.newReview)
      .then(() => {
        this.onNewReviewAdded.emit(this.newReview);
        console.log('review was added');
        // this.newReview = new ReviewModel();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
