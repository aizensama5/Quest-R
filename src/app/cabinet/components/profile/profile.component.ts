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


@Component({
  moduleId: module.id,
  selector: 'app-cabinet-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent {
  user$: Observable<firebase.User>;
  private user: any;
  userOrderInfo: OrderModel[];
  _passedRooms: RoomModel[] = [];
  _rooms: RoomModel[] = [];
  _gallery: GalleryModel[] = [];
  _reviews: ReviewModel[] = [];

  constructor(
    private authService: AuthenticationService,
    private orderService: OrderService,
    private roomService: RoomService,
    private galleryService: GalleryService,
    private reviewService: ReviewService
  ) {
    this.rooms();
    this.user$ = authService.currentUser();
    this.user$.subscribe((user: any) => {
      this.user = user;
      if (user) {
        orderService.all().subscribe((orderInfo: OrderModel[]) => {
          this.userOrderInfo = orderService.userOrders(orderInfo, user.uid);
          this._passedRooms = this.passedRooms(this.userOrderInfo);
          this.gallery(user.uid);
          this.reviews(user.uid);
        });
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

  reviews(userId: string) {
    this.reviewService.userReviews(userId).subscribe((reviews: ReviewModel[]) => {
      this._reviews = reviews;
    });
  }

  rooms(): void {
    this.roomService.allActive().subscribe((rooms: RoomModel[]) => {
      this._rooms = rooms;
    });
  }
}
