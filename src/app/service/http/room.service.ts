import {Injectable} from '@angular/core';
import {RoomModel} from '../../models/room.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class RoomService {
  private static readonly dataBaseName = 'room/';

  getRoomById (rooms: RoomModel[], roomId?: number) {
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      for (const key in room) {
        if (room[key] === roomId) {
          return room;
        }
      }
    }
    return;
  }

  constructor (private dataBaseService: AngularFireDatabase) {}

  addRoom(room: RoomModel): Promise<void> {
    return <Promise<void>>this.dataBaseService.object(RoomService.dataBaseName + room.id).set(room.toJSON());
  }

  all(): FirebaseListObservable<RoomModel[]> {
    return <FirebaseListObservable<RoomModel[]>>this.dataBaseService
      .list(RoomService.dataBaseName)
      .map((items) => items.map(RoomModel.fromJSON));
  }
}
