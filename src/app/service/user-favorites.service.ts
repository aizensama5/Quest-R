import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {UserFavoritesModel} from "../models/user-favorites.model";

@Injectable()
export class UserFavoritesService {
  private static readonly dataBaseName = 'user-favorites/';

  constructor(private databaseService: AngularFireDatabase) {}

  addUserFavorites(userFavorite: UserFavoritesModel): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(UserFavoritesService.dataBaseName + userFavorite.userId + '/' + userFavorite.roomId)
      .set(userFavorite);
  }

  removeUserFavorites(userFavorite: UserFavoritesModel): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(UserFavoritesService.dataBaseName + userFavorite.userId + '/' + userFavorite.roomId)
      .remove();
  }

  getUserFavorites(userId: string): FirebaseListObservable<UserFavoritesModel[]> {
    return <FirebaseListObservable<UserFavoritesModel[]>>this.databaseService
      .list(UserFavoritesService.dataBaseName + userId)
  }

  all(): FirebaseListObservable<any[]> {
    return <FirebaseListObservable<any[]>>this.databaseService
      .list(UserFavoritesService.dataBaseName);
  }

}
