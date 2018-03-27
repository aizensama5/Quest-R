import {Component, Input, OnInit} from '@angular/core';
import {RoomModel} from '../../../../../models/room.model';
import * as mainReducer from '../../../../../reducers';
import {Store} from '@ngrx/store';
import * as roomAction from '../../../../../action/room.action';
import {Observable} from "rxjs/Observable";
import {UserFavoritesService} from "../../../../../service/user-favorites.service";
import {UserFavoritesModel} from "../../../../../models/user-favorites.model";
import * as firebase from "firebase/app";
import {AuthenticationService} from "../../../../../service/http/authentication.service";


@Component({
  moduleId: module.id,
  selector: 'app-main-room',
  templateUrl: 'room.component.html',
  styleUrls: ['room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input() room: RoomModel = new RoomModel();

  user$: Observable<firebase.User>;
  user: any;

  userFavorite: UserFavoritesModel;

  constructor(private store: Store<mainReducer.State>,
              private userFavoritesService: UserFavoritesService,
              private authService: AuthenticationService) {
    this.user$ = this.authService.currentUser();
    this.userFavorite = new UserFavoritesModel;
  }

  ngOnInit() {
    if (this.user$) {
      this.user$.subscribe((user: any) => {
        this.user = user;
      });
    }
  }

  reserve() {
    this.store.dispatch(new roomAction.Select(this.room));
    document.getElementById('reserved-room').scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }

  addToFavorites(roomId: number) {
    if (this.user) {
      this.userFavorite.isFavorite = true;
      this.userFavorite.userId = this.user.uid;
      this.userFavorite.roomId = roomId;
      this.userFavoritesService.addUserFavorites(this.userFavorite);
    }
  }

  removeFromFavorites(roomId: number) {
    this.userFavorite.roomId = roomId;
    this.userFavorite.userId = this.user.uid;
    this.userFavoritesService.removeUserFavorites(this.userFavorite)
      .then(() => {
        this.room.isFavorite = false;
      });
  }

}
