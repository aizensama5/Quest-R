import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComplexityModel } from '../../../../models/complexity.model';
import { MarkingModel } from '../../../../models/marking.model';
import { MarkingService } from '../../../../service/marking.service';
import { ComplexityService } from '../../../../service/complexity.service';
import { GenreModel } from '../../../../models/genre.model';
import { FilterModel } from '../../../../models/filter.model';
import { RoomModel } from '../../../../models/room.model';
import { RoomService } from '../../../../service/http/room.service';

@Component({
  moduleId: module.id,
  selector: 'app-main-filter-rooms',
  templateUrl: 'filter-rooms.component.html',
  styleUrls: ['filter-rooms.component.scss'],
})
export class FilterRoomsComponent implements OnInit {

  isDisplayPlayersCircle = false;
  isDisplayPriceCircle = false;
  isDisplayGenreCircle = true;
  rooms: RoomModel[] = [];

  filterArray: FilterModel = new FilterModel();

  complexity: ComplexityModel[] = [];
  marking: MarkingModel[] = [];

  @Output() filteredRooms: EventEmitter<RoomModel[]> = new EventEmitter<RoomModel[]>();

  constructor(
    private markingService: MarkingService,
    private complexityService: ComplexityService,
    private roomService: RoomService
  ) {
    markingService.all().subscribe((marking: MarkingModel[]) => {
      this.marking = marking;
    });
    complexityService.all().subscribe((complexity: ComplexityModel[]) => {
      this.complexity = complexity;
    });
    roomService.allActive().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });

    this.filterArray.filterChange.subscribe((filter: FilterModel) => {
      this.filterArray = filter;
      this.filterRooms();
    });
  }

  filterRooms(): void {
    this.roomService.filterRooms(this.rooms, this.filterArray).subscribe((filteredRooms: RoomModel[]) => {
      this.filteredRooms.emit(filteredRooms);
    });
  }

  displayPlayersCircle() {
    this.isDisplayPlayersCircle = true;
    this.isDisplayGenreCircle = false;
    this.isDisplayPriceCircle = false;
  }

  displayGenreCircle() {
    this.isDisplayGenreCircle = true;
    this.isDisplayPlayersCircle = false;
    this.isDisplayPriceCircle = false;
  }

  displayPriceCircle() {
    this.isDisplayPriceCircle = true;
    this.isDisplayPlayersCircle = false;
    this.isDisplayGenreCircle = false;
  }

  onChangeGenre(genre: GenreModel) {
    this.filterArray.genre = genre;
  }

  onChangePrice(price: number) {
    this.filterArray.price = price;
  }

  onChangeCountPlayers(countPlayers: number) {
    this.filterArray.countPlayers = countPlayers;
  }

  onChangeComplexity(complexity: ComplexityModel[]) {
    this.filterArray.complexity = complexity;
  }

  onChangeMarking(marking: MarkingModel[]) {
    this.filterArray.marking = marking;
  }

  deleteFilterPlayers() {
    this.filterArray.countPlayers = 0;
  }

  deleteFilterGenre() {
    this.filterArray.genre = new GenreModel();
  }

  deleteFilterPrice() {
    this.filterArray.price = 0;
  }

  deleteFilterComplexity() {
    this.filterArray.complexity = [];
  }

  deleteFilterMarkingItem(markingId: number) {
    const indexToRemove = this.filterArray.marking.findIndex(obj => obj.id === markingId);
    this.filterArray.marking.splice(indexToRemove , 1);
  }

  ngOnInit() {
  }
}
