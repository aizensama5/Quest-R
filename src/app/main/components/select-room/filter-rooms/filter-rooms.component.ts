import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ComplexityModel} from '../../../../models/complexity.model';
import {MarkingModel} from '../../../../models/marking.model';
import {MarkingService} from '../../../../service/marking.service';
import {ComplexityService} from '../../../../service/complexity.service';
import {GenreModel} from '../../../../models/genre.model';
import {FilterModel} from '../../../../models/filter.model';
import {RoomModel} from '../../../../models/room.model';
import {RoomService} from '../../../../service/http/room.service';

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
  displayedInitiallyRooms: RoomModel[] = [];

  isMobile = false;

  filterArray: FilterModel = new FilterModel();

  complexity: ComplexityModel[] = [];
  marking: MarkingModel[] = [];

  windowWidth: number;
  initialRoundCircleParams = {};
  desktopRoundCircleParams: any = {
    width: 480,
    height: 480,
    radius: 205,
    thick: 72
  };
  tabletRoundCircleParams: any = {
    width: 320,
    height: 320,
    radius: 132,
    thick: 55
  };
  miniTabletCircleParams: any = {
    width: 220,
    height: 220,
    radius: 93,
    thick: 32
  };
  mobileCircleParams: any = {
    width: 220,
    height: 220,
    radius: 93,
    thick: 32
  };
  tabletWidth = {
    max: 949,
    min: 757
  };
  miniTabletWidth = {
    max: 756,
    min: 529
  };
  mobileWidth = {
    max: 529,
    min: 280
  };

  @Output() filteredRooms: EventEmitter<RoomModel[]> = new EventEmitter<RoomModel[]>();

  constructor(private markingService: MarkingService,
              private complexityService: ComplexityService,
              private roomService: RoomService) {
    markingService.all().subscribe((marking: MarkingModel[]) => {
      this.marking = marking;
    });
    complexityService.all().subscribe((complexity: ComplexityModel[]) => {
      this.complexity = complexity;
    });
    this.roomService.allActive().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });
    this.roomService.displayedOnMainPage().subscribe((rooms: RoomModel[]) => {
      this.displayedInitiallyRooms = rooms;
    });

    this.filterArray.filterChange.subscribe((filter: FilterModel) => {
      this.filterArray = filter;
      if (!this.filterArray.marking.length && !this.filterArray.complexity.id && !this.filterArray.genre.id && !this.filterArray.price && !this.filterArray.countPlayers) {
        this.filteredRooms.emit(this.displayedInitiallyRooms);
      } else {
        this.filterRooms();
      }
    });
  }

  filterRooms(): void {
    this.roomService.filterRooms(this.rooms, this.filterArray)
      .then((filteredRooms: RoomModel[]) => {
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

  togglePlayersCircle() {
    this.isDisplayPlayersCircle = !this.isDisplayPlayersCircle;
  }

  toggleGenreCircle() {
    this.isDisplayGenreCircle = !this.isDisplayGenreCircle;
  }

  togglePriceCircle() {
    this.isDisplayPriceCircle = !this.isDisplayPriceCircle;
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

  onChangeComplexity(complexity: ComplexityModel) {
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
    this.filterArray.complexity = new ComplexityModel();
  }

  deleteFilterMarking() {
    this.filterArray.marking = [];
  }

  deleteFilterMarkingItem(markingId: number) {
    const indexToRemove = this.filterArray.marking.findIndex(obj => obj.id === markingId);
    this.filterArray.marking.splice(indexToRemove, 1);
  }

  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.checkRoundCircleParams();
  }

  checkRoundCircleParams() {
    if (this.windowWidth >= this.tabletWidth.min && this.windowWidth <= this.tabletWidth.max) {
      this.initialRoundCircleParams = this.tabletRoundCircleParams;
    } else if (this.windowWidth >= this.miniTabletWidth.min && this.windowWidth <= this.miniTabletWidth.max) {
      this.initialRoundCircleParams = this.miniTabletCircleParams;
    } else if (this.windowWidth >= this.mobileWidth.min && this.windowWidth <= this.mobileWidth.max) {
      this.initialRoundCircleParams = this.mobileCircleParams;
    } else {
      this.initialRoundCircleParams = this.desktopRoundCircleParams;
    }
    console.log(this.initialRoundCircleParams);
  }

  keepTrackOfWindowSize() {
    if (window.innerWidth <= this.mobileWidth.max) {
      this.isMobile = true;
    }
  }

  ngOnInit() {
    this.keepTrackOfWindowSize();
    this.windowWidth = window.innerWidth;
    this.checkRoundCircleParams();
  }
}
