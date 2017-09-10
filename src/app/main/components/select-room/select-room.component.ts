import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../../models/room.model';
import { RoomService } from '../../../service/http/room.service';
import { GenreModel } from '../../../models/genre.model';
import * as mainReducer from '../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'app-main-select-room',
  templateUrl: 'select-room.component.html',
  styleUrls: ['select-room.component.scss']
})
export class SelectRoomComponent implements OnInit {
  rooms: RoomModel[] = [];
  allRooms: RoomModel[] = [];
  filteredRooms: RoomModel[] = [];
  selectedGenre: GenreModel = new GenreModel();
  selectedGenre$: Observable<GenreModel>;
  selectedCountPlayers = null;

  constructor(
    private roomService: RoomService,
    private store: Store<mainReducer.State>
  ) {
    roomService.displayedOnMainPage().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });

    this.selectedGenre$ = this.store.select(mainReducer.getGenre);
    this.selectedGenre$.subscribe((genre: GenreModel) => {
      this.selectedGenre = genre;
      this.getFilteredByGenre();
    });


    this.store.subscribe((s) => {
      this.selectedCountPlayers = s['playersCount'].selectedCountPlayers;
      this.getFilteredByCountOfPlayers();
    });

    roomService.all().subscribe((rooms: RoomModel[]) => {
      this.allRooms = rooms;
    });
  }

  getFilteredByGenre() {
    if (this.selectedGenre) {
      this.roomService.filterByGenre(this.allRooms, this.selectedGenre.id).subscribe((filteredRooms: RoomModel[]) => {
        this.rooms = filteredRooms;
      });
    }
  }

  getFilteredByCountOfPlayers() {
    if (this.selectedCountPlayers) {
      this.roomService.filterByCountOfPlayers(this.allRooms, this.selectedCountPlayers).subscribe((filteredRooms: RoomModel[]) => {
        this.rooms = filteredRooms;
      });
    }
  }

  ngOnInit() {
  }
}
