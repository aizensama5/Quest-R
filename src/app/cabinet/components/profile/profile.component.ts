import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/http/authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { UserRoomsHistoryModel } from '../../../models/user-room-history.model';
import { UserRoomHistoryService } from '../../../service/http/user-room-history.service';
import { OrderService } from '../../../service/http/order.service';
import { OrderModel } from '../../../models/order.model';
import { RoomService } from '../../../service/http/room.service';
import { RoomModel } from '../../../models/room.model';
import { GalleryModel } from '../../../models/profile/gallery.model';
import { GalleryService } from '../../../service/profile/gallery.service';
import { ReviewModel } from '../../../models/review.model';
import { ReviewService } from '../../../service/http/review.service';
import {UserHistoryService} from "../../../service/user-history.service";
import {UserHistoryModel} from "../../../models/user-history.model";
import {ActivatedRoute} from "@angular/router";


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
  _gallery: GalleryModel[] = [];
  reviews: ReviewModel[] = [];

  constructor(
    private authService: AuthenticationService,
    private roomService: RoomService,
    private galleryService: GalleryService,
    private reviewService: ReviewService,
    private userHistoryService: UserHistoryService,
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

  passedRooms(userOrderInfo: OrderModel[]): RoomModel[] {
    const rooms: RoomModel[] = [];
    if (this._rooms) {
      userOrderInfo.forEach((info: OrderModel) => {
        this.roomService.roomById(info.roomId).subscribe((room: RoomModel[]) => {
          rooms.push(room[0]);
        });
      });
    }
    return rooms;
  }

  gallery(userId: string) {
    this.galleryService.userGallery(userId).subscribe((gallery: GalleryModel[]) => {
      this._gallery = gallery;
    });
  }

  rooms(): void {
    this.roomService.allActive().subscribe((rooms: RoomModel[]) => {
      this._rooms = rooms;
    });
  }
}
