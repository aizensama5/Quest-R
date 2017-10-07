import {Injectable} from '@angular/core';
import {RoomModel} from '../../models/room.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import { FilterModel } from '../../models/filter.model';
import {ComplexityModel} from '../../models/complexity.model';
import {MarkingModel} from '../../models/marking.model';

@Injectable()
export class RoomService {
  private static readonly dataBaseName = 'room/';

  // roomById (roomId: number, rooms: RoomModel[]): RoomModel {
  //   return rooms.filter((room: RoomModel) => room.id === roomId)[0] || new RoomModel();
  // }

  constructor (private dataBaseService: AngularFireDatabase) {}

  addRoom(room: RoomModel): Promise<void> {
    return <Promise<void>>this.dataBaseService.object(RoomService.dataBaseName + room.id).set(room);
  }

  all(): FirebaseListObservable<RoomModel[]> {
    return <FirebaseListObservable<RoomModel[]>>this.dataBaseService
      .list(RoomService.dataBaseName, {
        query: {
          orderByChild: 'active',
          equalTo: 1
        }
      })
      .map((items) => items.map(RoomModel.fromJSON));
  }

  roomById(id: number): FirebaseListObservable<RoomModel[]> {
    return <FirebaseListObservable<RoomModel[]>>this.dataBaseService
      .list(RoomService.dataBaseName, {
        query: {
          orderByChild: 'id',
          equalTo: id
        }
      })
      .map((items) => items.map(RoomModel.fromJSON));
  }

  lastId(rooms: RoomModel[]): number {
    const roomsIds: number[] = [];
    if (rooms.length) {
      rooms.forEach((room: RoomModel) => {
        roomsIds.push(room.id);
      });
    } else {
      roomsIds.push(1);
    }
    return Math.max.apply(null, roomsIds);
  }

  roomsByCompanyId(companyId: number): FirebaseListObservable<RoomModel[]> {
    return <FirebaseListObservable<RoomModel[]>>this.dataBaseService
      .list(RoomService.dataBaseName, {
        query: {
          orderByChild: 'companyId',
          equalTo: companyId
        }
      })
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


  filterByGenre(rooms: RoomModel[], genreId: number): RoomModel[] {
    const filteredRooms: RoomModel[] = [];
    rooms.filter((room: RoomModel) => {
      if (room.ganre.id === genreId) {
        filteredRooms.push(room);
      }
    });
    return filteredRooms;
  }

  filterByCountOfPlayers(rooms: RoomModel[], count: number): RoomModel[] {
    const filteredRooms: RoomModel[] = [];
    rooms.filter((room: RoomModel) => {
      if (room.countPlayers.maxCountPlayers >= count && room.countPlayers.minCountPlayers <= count) {
        filteredRooms.push(room);
      }
    });
    return filteredRooms;
  }

  filterByPrice(rooms: RoomModel[], price: number): RoomModel[] {
    const filteredRooms: RoomModel[] = [];
    rooms.filter((room: RoomModel) => {
      if (room.price.maxPrice >= price && room.price.minPrice <= price) {
        filteredRooms.push(room);
      }
    });
    return filteredRooms;
  }

  filterByMarking(rooms: RoomModel[], marking: MarkingModel[]): RoomModel[] {
    const all: number[] = [];
    const countFilters = marking.length;
    let sortedAll: number[] = [];
    let filteredRooms: RoomModel[] = [];

    rooms.filter((room: RoomModel) => {
      marking.forEach((mark) => {
        room.marking.filter((roomMarking: MarkingModel) => {
          if (roomMarking.id === mark.id) {
            all.push(room.id);
          }
        });
      });
    });

    sortedAll = all.slice().sort();
    filteredRooms = this.filterRoomsBySortedRoomIds(rooms, sortedAll, countFilters);

    return filteredRooms;
  }

  filterByComplexity(rooms: RoomModel[], complexity: ComplexityModel[]): RoomModel[] {
    const all: number[] = [];
    const countFilters = complexity.length;
    let sortedAll: number[] = [];
    let filteredRooms: RoomModel[] = [];

    rooms.filter((room: RoomModel) => {
      complexity.forEach((comp) => {
        room.complexity.filter((roomComplexity: ComplexityModel) => {
          if (roomComplexity.id === comp.id) {
            all.push(room.id);
          }
        });
      });
    });

    sortedAll = all.slice().sort();
    filteredRooms = this.filterRoomsBySortedRoomIds(rooms, sortedAll, countFilters);

    return filteredRooms;
  }

  filterRooms(rooms: RoomModel[], filterArray: FilterModel): Observable<RoomModel[]> {
    const all: number[] = [];
    let filteredRoom: RoomModel[] = [];
    let sortedAll: number[] = [];
    let countFilters = 0;

    const filterElement = {
      complexityLength: filterArray.complexity.length,
      countPlayers: filterArray.countPlayers,
      genreId: filterArray.genre.id,
      price: filterArray.price,
      markingLength: filterArray.marking.length
    };

    const allFilteredRooms = {
      roomsByPrice: filterElement.price ? this.filterByPrice(rooms, filterElement.price) : [],
      roomsByGenre: filterElement.genreId ? this.filterByGenre(rooms, filterElement.genreId) : [],
      roomsByCountPlayers: filterElement.countPlayers ? this.filterByCountOfPlayers(rooms, filterElement.countPlayers) : [],
      roomsByComplexity: filterElement.complexityLength ? this.filterByComplexity(rooms, filterArray.complexity) : [],
      roomsByMarking: filterElement.markingLength ? this.filterByMarking(rooms, filterArray.marking) : []
    };

    for (const el in filterElement) {
      if (filterElement[el]) {
        countFilters++;
      }
    }

    for (const filteredRooms in allFilteredRooms) {
      if (allFilteredRooms[filteredRooms].length) {
        allFilteredRooms[filteredRooms].forEach((room: RoomModel) => {
          all.push(room.id);
        });
      }
    }

    sortedAll = all.slice().sort();
    filteredRoom = this.filterRoomsBySortedRoomIds(rooms, sortedAll, countFilters);

    return Observable.of(filteredRoom);
  }

  filterRoomsBySortedRoomIds (rooms: RoomModel[], sortedRoomsIds: number[], countFilters: number) {
    const filteredRooms: RoomModel[] = [];
    for (let i = 0; i < sortedRoomsIds.length; i++) {
      if (sortedRoomsIds.length > (i + countFilters - 1) && sortedRoomsIds[i + countFilters - 1] === sortedRoomsIds[i]) {
        this.roomById(sortedRoomsIds[i]).subscribe((room: RoomModel[]) => {
          filteredRooms.push(room[0]);
        });
      }
    }
    return filteredRooms;
  }

}
