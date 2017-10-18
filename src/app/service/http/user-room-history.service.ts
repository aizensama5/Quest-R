import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserRoomsHistoryModel } from '../../models/user-room-history.model';

@Injectable()
export class UserRoomHistoryService {

  private static readonly dataBaseName = 'user_room_history/';

  constructor(private dataBaseService: AngularFireDatabase) {}

  addUserHistory(userRoomHistory: UserRoomsHistoryModel): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(UserRoomHistoryService.dataBaseName + userRoomHistory.userId + '/' + userRoomHistory.roomId)
      .set(userRoomHistory);
  }

  all(): FirebaseListObservable<UserRoomsHistoryModel[]> {
    return <FirebaseListObservable<UserRoomsHistoryModel[]>>this.dataBaseService
      .list(UserRoomHistoryService.dataBaseName)
      .map((items) => items.map(UserRoomsHistoryModel.fromJSON));
  }

  userRoomHistory(userId: number): FirebaseListObservable<UserRoomsHistoryModel[]> {
    return <FirebaseListObservable<UserRoomsHistoryModel[]>>this.dataBaseService
      .list(UserRoomHistoryService.dataBaseName + userId)
      .map((items) => items.map(UserRoomsHistoryModel.fromJSON));
  }
}
