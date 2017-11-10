import {Injectable} from '@angular/core';
import {RoomModel} from '../../models/room.model';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FilterModel} from '../../models/filter.model';
import {MarkingModel} from '../../models/marking.model';
import {PhotoModel} from "../../models/profile/photo.model";

@Injectable()
export class RoomService {
  private static readonly dataBaseName = 'room/';

  constructor(private dataBaseService: AngularFireDatabase) {
  }

  getRoomById(roomId: number, rooms: RoomModel[]): RoomModel {
    return rooms.filter((room: RoomModel) => room.id == roomId)[0] || new RoomModel();
  }

  addRoom(room: RoomModel): Promise<void> {
    return <Promise<void>>this.dataBaseService.object(RoomService.dataBaseName + room.id).set(room);
  }

  deleteRoom(roomId: number): Promise<void> {
    return <Promise<void>>this.dataBaseService.object(RoomService.dataBaseName + roomId).remove();
  }

  all(): FirebaseListObservable<RoomModel[]> {
    return <FirebaseListObservable<RoomModel[]>>this.dataBaseService
      .list(RoomService.dataBaseName)
      .map((items) => items.map(RoomModel.fromJSON));
  }

  allActive(): FirebaseListObservable<RoomModel[]> {
    return <FirebaseListObservable<RoomModel[]>>this.dataBaseService
      .list(RoomService.dataBaseName, {
        query: {
          orderByChild: 'active',
          equalTo: true
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

  lastPhotoGalleryItemId(room: RoomModel): number {
    const photosIds: number[] = [];
    if (room.gallery.length) {
      room.gallery.forEach((photo: PhotoModel) => {
        photosIds.push(photo.id);
      });
    } else {
      photosIds.push(1);
    }
    return Math.max.apply(null, photosIds) + 1;
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

  filterByMarking(rooms: RoomModel[], marking: MarkingModel[]) {
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
    this.filterRoomsBySortedRoomIds(rooms, sortedAll, countFilters)
      .then((rooms: RoomModel[]) => {
        filteredRooms = rooms;
        return filteredRooms;
      })
      .catch(() => {
        return filteredRooms;
      });

  }

  filterByComplexity(rooms: RoomModel[], complexityId: number): RoomModel[] {
    const filteredRooms: RoomModel[] = [];
    rooms.filter((room: RoomModel) => {
      if (room.complexity.id === complexityId) {
        filteredRooms.push(room);
      }
    });
    return filteredRooms;
  }

  filterRooms(rooms: RoomModel[], filterArray: FilterModel): Promise<RoomModel[]> {
    return new Promise((resolve, reject) => {
      const all: number[] = [];
      let filteredRoom: RoomModel[] = [];
      let sortedAll: number[] = [];
      let countFilters = 0;

      const filterElement = {
        complexity: filterArray.complexity.id,
        countPlayers: filterArray.countPlayers,
        genreId: filterArray.genre.id,
        price: filterArray.price,
        markingLength: filterArray.marking.length
      };


      const allFilteredRooms = {
        roomsByPrice: filterElement.price ? this.filterByPrice(rooms, filterElement.price) : [],
        roomsByGenre: filterElement.genreId ? this.filterByGenre(rooms, filterElement.genreId) : [],
        roomsByCountPlayers: filterElement.countPlayers ? this.filterByCountOfPlayers(rooms, filterElement.countPlayers) : [],
        roomsByComplexity: filterElement.complexity ? this.filterByComplexity(rooms, filterElement.complexity) : [],
        roomsByMarking: filterElement.markingLength ? this.filterByMarking(rooms, filterArray.marking) : []
      };

      for (const el in filterElement) {
        if (filterElement[el]) {
          countFilters++;
        }
      }

      for (const filteredRooms in allFilteredRooms) {
        if (allFilteredRooms[filteredRooms] && allFilteredRooms[filteredRooms].length) {
          allFilteredRooms[filteredRooms].forEach((room: RoomModel) => {
            all.push(room.id);
          });
        }
      }
      sortedAll = all.slice().sort();
      this.filterRoomsBySortedRoomIds(rooms, sortedAll, countFilters)
        .then((rooms) => {
          console.log(rooms);
          resolve(rooms);
        })
        .catch((rejectRooms) => {
          console.log('here');
          console.log(rejectRooms);
        })
    });
  }

  filterRoomsBySortedRoomIds(rooms: RoomModel[], sortedRoomsIds: number[], countFilters: number): Promise<RoomModel[]> {
    const filteredRooms: RoomModel[] = [];
    return new Promise((resolve, reject) => {
      for (let i = 0; i < sortedRoomsIds.length; i++) {
        if (sortedRoomsIds.length > (i + countFilters - 1) && sortedRoomsIds[i + countFilters - 1] === sortedRoomsIds[i]) {
          this.roomById(sortedRoomsIds[i]).subscribe((room: RoomModel[]) => {
            filteredRooms.push(room[0]);
            resolve(filteredRooms);
          });
        } else if (!filteredRooms.length && sortedRoomsIds.length === i - 1) {
          reject(filteredRooms);
        }
      }
    });
  }

}
