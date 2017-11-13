import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {UserHistoryModel} from "../models/user-history.model";
import {OrderModel} from "../models/order.model";

@Injectable()
export class UserHistoryService {
  private static readonly dataBaseName = 'user-history/';

  constructor(private databaseService: AngularFireDatabase) {}

  addUserHistory(userHistory: UserHistoryModel): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(UserHistoryService.dataBaseName + userHistory.userId + '/' + userHistory.id)
      .set(userHistory);
  }

  getRoomHistoryById (roomId: number, id: string): FirebaseListObservable<UserHistoryModel[]> {
    return <FirebaseListObservable<UserHistoryModel[]>>this.databaseService
      .list(UserHistoryService.dataBaseName + roomId, {
        query: {
          orderByChild: 'id',
          equalTo: id
        }
      });
  }

  getUserHistoriesById(userId: string): FirebaseListObservable<UserHistoryModel[]> {
    return <FirebaseListObservable<UserHistoryModel[]>>this.databaseService
      .list(UserHistoryService.dataBaseName + userId)
  }

  getAvailableUserHistoryByRoomId(userHistories: UserHistoryModel[], roomId: number): Promise<UserHistoryModel[]> {
    return new Promise((resolve) => {
      let userHistoriesByRoomId: UserHistoryModel[] = [];
      console.log(userHistories);
      userHistories.forEach((userHistory: UserHistoryModel) => {
        if (userHistory.roomId === +roomId) {
          userHistoriesByRoomId.push(userHistory);
        }
      });
      resolve(userHistoriesByRoomId);
    });

  }

  all(): FirebaseListObservable<UserHistoryModel[]> {
    return <FirebaseListObservable<UserHistoryModel[]>>this.databaseService
      .list(UserHistoryService.dataBaseName);
  }

}
