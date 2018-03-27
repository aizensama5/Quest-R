import { Component } from '@angular/core';
import { RoomModel } from '../../../../models/room.model';
import {UserFavoritesModel} from "../../../../models/user-favorites.model";
import {UserFavoritesService} from "../../../../service/user-favorites.service";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase/app";
import {RoomService} from "../../../../service/http/room.service";
import {AuthenticationService} from "../../../../service/http/authentication.service";
import * as mainReducer from '../../../../reducers';
import { Store } from '@ngrx/store';
import * as roomAction from '../../../../action/room.action';
import { Router } from "@angular/router";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoritesData: UserFavoritesModel[] = [];
  user$: Observable<firebase.User>;
  favoritesRooms: RoomModel[] = [];


  constructor(
    private userFavoritesService: UserFavoritesService,
    private roomService: RoomService,
    private authService: AuthenticationService,
    private store: Store<mainReducer.State>,
    private router: Router
  ) {
    this.user$ = this.authService.currentUser();
    this.user$.subscribe((user: any) => {
      userFavoritesService.getUserFavorites(user.uid).subscribe((favData: any) => {
        this.favoritesData = favData;
        this.roomService.all().subscribe((rooms: RoomModel[]) => {
          this.favoritesData.forEach((favorData: UserFavoritesModel) => {
            this.favoritesRooms.push(this.roomService.getRoomById(favorData.roomId, rooms));
          });
        });
      });
    });
  }

  reserve(room: RoomModel) {
    this.router.navigate(['/'])
      .then(() => {
        this.store.dispatch(new roomAction.Select(room));
        setTimeout(() => {
          document.getElementById('reserved-room').scrollIntoView({
            block: 'start',
            behavior: 'smooth'
          });
        }, 1000);
      })
  }
}
