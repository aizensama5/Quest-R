import {Component, EventEmitter, Output} from '@angular/core';
import {RoomService} from '../../../../../service/http/room.service';
import {RoomModel} from '../../../../../models/room.model';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AuthenticationService} from '../../../../../service/http/authentication.service';
import {ReviewService} from '../../../../../service/http/review.service';
import {ReviewModel} from '../../../../../models/review.model';

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
  rooms: RoomModel[];
  @Output() onNewReviewAdded: EventEmitter<ReviewModel> = new EventEmitter<ReviewModel>();


  constructor(public roomService: RoomService,
              private authService: AuthenticationService,
              public reviewService: ReviewService) {
    roomService.all().subscribe((rooms) => {
      this.rooms = rooms;
    });
    this.user$ = authService.currentUser();
    this.user$.subscribe((user: any) => {
      this.user = user;
    });
    reviewService.all().subscribe((reviews: ReviewModel[]) => {
      this.allReviews = reviews;
    });
  }

  save() {
    this.newReview.id = this.reviewService.lastId(this.allReviews) + 1;
    this.newReview.userId = this.user.uid;
    this.newReview.created = new Date().toString();
    this.reviewService.addReview(this.newReview)
      .then(() => {
        this.onNewReviewAdded.emit(this.newReview);
        console.log('review was added');
        this.newReview = new ReviewModel();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
