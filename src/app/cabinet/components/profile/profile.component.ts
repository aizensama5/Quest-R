import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/http/authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { RoomService } from '../../../service/http/room.service';
import { RoomModel } from '../../../models/room.model';
import { ReviewModel } from '../../../models/review.model';
import { UserHistoryModel } from "../../../models/user-history.model";
import { ActivatedRoute } from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'app-cabinet-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent {
  user$: Observable<firebase.User>;
  private user: any;
  userHistories: UserHistoryModel[];
  _rooms: RoomModel[] = [];
  reviews: ReviewModel[] = [];

  constructor(
    private authService: AuthenticationService,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute
  ) {
    this.rooms();
    this.user$ = authService.currentUser();
    this.user$.subscribe((user: any) => {
      this.user = user;
    });
    this.activatedRoute.data.subscribe((data) => {
      if (data['userHistory']) {
        this.userHistories = data['userHistory'];
      }
    });
  }

  rooms(): void {
    this.roomService.allActive().subscribe((rooms: RoomModel[]) => {
      this._rooms = rooms;
    });
  }
}
