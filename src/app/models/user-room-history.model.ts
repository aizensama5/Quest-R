import { RoomHistoryModel } from './room-history.model';
import { FirebaseUtils } from '../shared/firebase.utils';

export class UserRoomsHistoryModel {
  userId: number;
  roomId: number;
  roomHistory: RoomHistoryModel[];

  static fromJSON(values) {
    const userRoomHistory = new UserRoomsHistoryModel();

    for (const value in values) {
      if (userRoomHistory.hasOwnProperty(value)) {
        userRoomHistory[value] = values[value];
      }
    }
    return userRoomHistory;
  }

  static fromJsonArray(json: any[]): UserRoomsHistoryModel[] {
    return json.map(UserRoomsHistoryModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.userId = null;
    this.roomId = null;
    this.roomHistory = [];
  }
}
