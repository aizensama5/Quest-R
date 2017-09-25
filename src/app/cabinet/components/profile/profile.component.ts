import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/http/authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { UserRoomsHistoryModel } from '../../../models/user-room-history.model';
import { UserRoomHistoryService } from '../../../service/http/user-room-history.service';
import { OrderService } from '../../../service/http/order.service';
import { OrderModel } from '../../../models/order.model';
import { RoomService } from '../../../service/http/room.service';
import {RoomModel} from '../../../models/room.model';
import {RoomHistoryModel} from '../../../models/room-history.model';


@Component({
  moduleId: module.id,
  selector: 'app-cabinet-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent {
  private user$: Observable<firebase.User>;
  // private userRoomHistory: UserRoomsHistoryModel[] = [];
  private user: any;
  userOrderInfo: OrderModel[];
  _passedRooms: RoomModel[] = [];
  _rooms: RoomModel[] = [];
  _userHistories: RoomHistoryModel[] = [];

  constructor(
    private authService: AuthenticationService,
    // private userRoomHistoryService: UserRoomHistoryService,
    private orderService: OrderService,
    public roomService: RoomService
  ) {
    this.rooms();
    this.user$ = authService.currentUser();
    this.user$.subscribe((user: any) => {
      this.user = user;
      orderService.all().subscribe((orderInfo: OrderModel[]) => {
        this.userOrderInfo = orderService.userOrders(orderInfo, user.uid);
        this._passedRooms = this.passedRooms(this.userOrderInfo);
        // this._userHistories = [{}];
      });
      // this.userRoomHistory = userRoomHistoryService.userRoomHistory(user.uid);
    });
  }

  passedRooms(userOrderInfo: OrderModel[]): RoomModel[] {
    const rooms: RoomModel[] = [];
    if (this._rooms) {
      userOrderInfo.forEach((info: OrderModel) => {
        rooms.push(this.roomService.roomById(info.roomId, this._rooms));
      });
    }
    return rooms;
  }

  rooms(): void {
    this.roomService.all().subscribe((rooms: RoomModel[]) => {
      this._rooms = rooms;
    });
  }
}
