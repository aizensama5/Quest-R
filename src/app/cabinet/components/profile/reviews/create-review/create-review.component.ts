import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomService } from '../../../../../service/http/room.service';
import { RoomModel } from '../../../../../models/room.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../../../../../service/http/authentication.service';
import { ReviewService } from '../../../../../service/http/review.service';
import { ReviewModel } from '../../../../../models/review.model';
import { UserHistoryModel } from "../../../../../models/user-history.model";
import { UserHistoryService } from "../../../../../service/user-history.service";

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
  @Input() reviews: ReviewModel[];
  @Output() onNewReviewAdded: EventEmitter<ReviewModel> = new EventEmitter<ReviewModel>();

  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;


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
          this.getClosedDateOfVisit(userHistoriesByRoomId)
            .then((closedDateOfVisit: number[]) => {
              userHistoriesByRoomId.forEach((userHistory: UserHistoryModel) => {
                this.datesOfVisit.push(+userHistory.id.split('_')[1]);
                closedDateOfVisit.forEach((dateOfVisit: number) => {
                  if (+userHistory.id.split('_')[1] === dateOfVisit) {
                    this.datesOfVisit.splice(this.datesOfVisit.indexOf(dateOfVisit), 1);
                  }
                })
              });
            });
        });
    }
  }

  getClosedDateOfVisit (userHistoriesByRoomId: UserHistoryModel[]): Promise<number[]> {
    return new Promise((resolve) => {
      let closedDateOfVisit: number[] = [];
      for (let j = 0; j < this.reviews.length; j++) {
        for (let i = 0; i < userHistoriesByRoomId.length; i++) {
          if (userHistoriesByRoomId[i].id === this.newReview.roomId + '_' + this.reviews[j].visited) {
            closedDateOfVisit.push(+userHistoriesByRoomId[i].id.split('_')[1]);
          }
        }
      }
      resolve(closedDateOfVisit);
    });
  }

  save() {
    this.areErrors = false;
    this.isShowLoader = true;
    this.newReview.id = this.reviewService.lastId(this.allReviews) + 1;
    this.newReview.userId = this.user.uid;
    this.newReview.created = +Date.now();
    if (this.newReview.roomId && this.newReview.visited && this.newReview.review) {
      this.reviewService.addReview(this.newReview)
        .then(() => {
          this.isShowNotificationPopup = true;
          this.isShowLoader = false;
          this.notificationPopupMessage = 'Saved successfully!';
          this.onNewReviewAdded.emit(this.newReview);
          this.datesOfVisit = [];
          this.newReview = new ReviewModel();
        })
        .catch(() => {
          this.isShowNotificationPopup = true;
          this.isShowLoader = false;
          this.areErrors = true;
          this.notificationPopupMessage = 'Error!';
        });
    } else {
      this.isShowNotificationPopup = true;
      this.isShowLoader = false;
      this.areErrors = true;
      this.notificationPopupMessage = 'Please, fill all fields!';
    }
  }

  closePopup() {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
    this.areErrors = false;
  }
}
