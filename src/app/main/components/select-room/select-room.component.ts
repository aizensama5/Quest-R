import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../../models/room.model';
import { RoomService } from '../../../service/http/room.service';
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";
import {UserFavoritesService} from "../../../service/user-favorites.service";
import {UserFavoritesModel} from "../../../models/user-favorites.model";
import {AuthenticationService} from "../../../service/http/authentication.service";

@Component({
  moduleId: module.id,
  selector: 'app-main-select-room',
  templateUrl: 'select-room.component.html',
  styleUrls: ['select-room.component.scss']
})
export class SelectRoomComponent implements OnInit {
  rooms: RoomModel[] = [];
  user$: Observable<firebase.User>;
  user: any;


  constructor(
    private roomService: RoomService,
    private userFavoritesService: UserFavoritesService,
    private authService: AuthenticationService
  ) {
    roomService.displayedOnMainPage().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
      this.checkFavoritesRooms();
    });
    this.user$ = this.authService.currentUser();
  }

  onFilteredRooms(rooms: RoomModel[]) {
    this.rooms = rooms;
    this.checkFavoritesRooms();
  }

  checkFavoritesRooms() {
    if (this.user$) {
      this.user$.subscribe((user: any) => {
        this.user = user;
        if (user) {
          this.userFavoritesService.getUserFavorites(user.uid).subscribe((userFavorites: UserFavoritesModel[]) => {
            userFavorites.forEach((userFavor: UserFavoritesModel) => {
              this.rooms.forEach((room: RoomModel) => {
                if (room.id === userFavor.roomId) {
                  room.isFavorite = true;
                }
              })
            });
          });
        }
      });
    }
  }

  ngOnInit() {

  }
}
