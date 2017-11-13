import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../../../service/pager.service';
import { ReviewModel } from '../../../../models/review.model';
import { ActivatedRoute } from "@angular/router";
import { UserHistoryModel } from "../../../../models/user-history.model";
import { ReviewService } from "../../../../service/http/review.service";
import { Observable } from "rxjs/Observable";
import * as firebase from "firebase/app";
import { AuthenticationService } from "../../../../service/http/authentication.service";
import { RoomModel } from "../../../../models/room.model";
import { RoomService } from "../../../../service/http/room.service";

@Component({
  selector: 'app-cabinet-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  static COUNT_REVIEW_PER_PAGE = 2;
  reviews: ReviewModel[] = [];
  pager: any = {};
  profilePagedItems: any[];
  userHistories: UserHistoryModel[] = [];
  user$: Observable<firebase.User>;
  user: any;
  passedRooms: any[] = [];

  constructor(
    private pagerService: PagerService,
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private authService: AuthenticationService,
    private roomService: RoomService
  ) {
    this.user$ = authService.currentUser();
    this.user$.subscribe((user: any) => {
      this.user = user;
      this.activatedRoute.data.subscribe((data) => {
        if (data['userHistory']) {
          this.userHistories = data['userHistory'];
          this.roomService.all().subscribe((rooms: RoomModel[]) => {
            this.getPassedRoomsIds(this.getAllPassedRoomsIds()).forEach((roomId: number) => {
              this.passedRooms.push(this.roomService.byId(rooms, roomId));
            });
          });
        }
      });
      this.reviewService.all().subscribe((reviews: ReviewModel[]) => {
        this.reviewService.userReviews(this.reviewService.orderByIdDESC(reviews), this.user.uid)
          .then((userReviews: ReviewModel[]) => {
            this.reviews = userReviews;
            this.setPage(1);
          });
      });
    });
  }

  getAllPassedRoomsIds(): number[] {
    let roomsIds: number[] = [];
    this.userHistories.forEach((userHistory: UserHistoryModel) => {
      roomsIds.push(userHistory.roomId);
    });
    return roomsIds;
  }

  getPassedRoomsIds(allRoomIds: number[]): number[] {
    let passedRooms: number[] = [];
    allRoomIds.slice().sort();
    for (let i = 0; i < allRoomIds.length; i++) {
      if (i === 0 || allRoomIds[i+1] && allRoomIds[i+1] > allRoomIds[i]) {
        passedRooms.push(allRoomIds[i+1]);
      }
    }
    return passedRooms;
  }

  ngOnInit() {
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.reviews.length, page, ReviewsComponent.COUNT_REVIEW_PER_PAGE);

    // get current page of items
    this.profilePagedItems = this.reviews.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onNewReviewAdded(review: ReviewModel) {
    this.setPage(1);
  }

}
