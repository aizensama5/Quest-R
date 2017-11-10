import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {UserHistoryModel} from "../models/user-history.model";

@Injectable()
export class UserHistoryService {
  private static readonly dataBaseName = 'user-history/';

  constructor(private databaseService: AngularFireDatabase) {}

  addUserHistory(userHistory: UserHistoryModel): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(UserHistoryService.dataBaseName + userHistory.userId + '/' + userHistory.id)
      .set(userHistory);
  }

  getUserHistoryById (userId: string, id: string): FirebaseListObservable<UserHistoryModel[]> {
    return <FirebaseListObservable<UserHistoryModel[]>>this.databaseService
      .list(UserHistoryService.dataBaseName + userId, {
        query: {
          orderByChild: 'id',
          equalTo: id
        }
      });
  }

  all(): FirebaseListObservable<UserHistoryModel[]> {
    return <FirebaseListObservable<UserHistoryModel[]>>this.databaseService
      .list(UserHistoryService.dataBaseName);
  }

}
