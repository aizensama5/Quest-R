import {Injectable} from '@angular/core';
import {RoomModel} from '../../models/room.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {GenreModel} from '../../models/genre.model';
import {Observable} from 'rxjs/Observable';

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

  lastRooms(count: number): FirebaseListObservable<RoomModel[]> {
    return <FirebaseListObservable<RoomModel[]>>this.dataBaseService
      .list(RoomService.dataBaseName, {
        query: {
          orderByChild: 'id',
          limitToLast: count
        }
      })
      .map((items) => items.map(RoomModel.fromJSON));
  }

  displayedOnMainPage(): FirebaseListObservable<RoomModel[]> {
    return <FirebaseListObservable<RoomModel[]>>this.dataBaseService
      .list(RoomService.dataBaseName, {
        query: {
          orderByChild: 'displayOnMain',
          equalTo: true
        }
      })
      .map((items) => items.map(RoomModel.fromJSON));
  }


  filterByGenre(rooms: RoomModel[], genreId: number): Observable<RoomModel[]> {
    const filteredRooms: RoomModel[] = [];
    rooms.filter((room: RoomModel) => {
      if (room.ganre.id === genreId) {
        filteredRooms.push(room);
      }
    });
    return Observable.of(filteredRooms);
  }

  filterByCountOfPlayers(rooms: RoomModel[], count: number): Observable<RoomModel[]> {
    const filteredRooms: RoomModel[] = [];
    rooms.filter((room: RoomModel) => {
      if (room.countPlayers.maxCountPlayers >= count && room.countPlayers.minCountPlayers <= count) {
        filteredRooms.push(room);
      }
    });
    return Observable.of(filteredRooms);
  }

  filterByPrice(rooms: RoomModel[], price: number): Observable<RoomModel[]> {
    const filteredRooms: RoomModel[] = [];
    rooms.filter((room: RoomModel) => {
      if (room.price.maxPrice >= price && room.price.minPrice <= price) {
        filteredRooms.push(room);
      }
    });
    return Observable.of(filteredRooms);
  }

}
