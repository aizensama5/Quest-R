import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { GenreService } from '../../../../../service/genre.service';
import { GenreModel } from '../../../../../models/genre.model';
import * as mainReducer from '../../../../../reducers';
import { Store } from '@ngrx/store';
import * as genreAction from '../../../../../action/genre.action';
import * as playerAction from '../../../../../action/players.action';
import * as priceAction from '../../../../../action/price.action';



@Component({
    moduleId: module.id,
    selector: 'app-main-filter-circle',
    templateUrl: 'filter-circle.component.html',
    styleUrls: ['filter-circle.component.scss']
})
export class FilterCircleComponent implements OnInit {

    @Input() displayPlayersCircle: boolean;
    @Input() displayGenreCircle: boolean;
    @Input() displayPriceCircle: boolean;

    minCountPlayers = 0;
    maxCountPlayers = 8;

    stepMarkValue = 10;

    minPrice = 0;
    maxPrice = 100;

    _valuePlayersFixed = 0;
    _valuePriceFixed = 0;


    priceStep = 360 / this.maxPrice;
    playerStep = 360 / this.maxCountPlayers;

    genres: GenreModel[];

    @ViewChild('inputPrice') inputPrice: ElementRef;
    @ViewChild('inputPlayers') inputPlayers: ElementRef;

    private _valuePrice = 0;
    private _valuePlayers = 0;
    private _genre: any;

    set valuePlayers(value: number) {
      this.checkValuePlayers(value);
      setTimeout(() => {
        this.inputPlayers.nativeElement.value = this._valuePlayers;
      });
    }

    get valuePlayers(): number {
      return this._valuePlayers;
    }

    set valuePrice(value: number) {
      this.checkValuePrice(value);
      setTimeout(() => {
        this.inputPrice.nativeElement.value = this._valuePrice;
      });
    }

    get valuePrice(): number {
      return this._valuePrice;
    }

    set selectedGenre(genre: any) {
      this._genre = genre;
      this.store.dispatch(new genreAction.Select(this._genre));
    }

    get selectedGenre(): any {
        return this._genre;
    }

    set valuePlayersOnFixedPos(value: number) {
      this.checkValuePlayers(value);
      this._valuePlayersFixed = this._valuePlayers;
      this.store.dispatch(new playerAction.Select(this._valuePlayersFixed));
    }

    get valuePlayersOnFixedPos(): number {
      return this._valuePlayersFixed;
    }

    set valuePriceOnFixedPos(value: number) {
      this.checkValuePlayers(value);
      this._valuePriceFixed = this._valuePrice;
      this.store.dispatch(new priceAction.Select(this._valuePriceFixed));
    }

    get valuePriceOnFixedPos(): number {
      return this._valuePriceFixed;
    }

    private mockGenres: any = [
        {id: 1, legend: 'С актерами', color: '#00ff00'},
        {id: 2, legend: 'Веселые', color: '#00ffff'},
        {id: 3, legend: 'Для детей', color: '#0080ff'},
        {id: 4, legend: 'Приключения', color: '#0000ff'},
        {id: 5, legend: 'Детектив', color: '#ffff00'},
        {id: 6, legend: 'Мистика', color: '#ff8000'},
        {id: 7, legend: 'Ужасы', color: '#ff0000'},
        {id: 8, legend: 'Книги/кино', color: '#ff0080'}
    ];

    checkValuePlayers (value: number): void {
      if (value > this.maxCountPlayers) {
        this._valuePlayers = this.maxCountPlayers;
      } else if (value < this.minCountPlayers) {
        this._valuePlayers = this.minCountPlayers;
      } else {
        this._valuePlayers = value;
      }
    }

    checkValuePrice (value: number): void {
      if (value > this.maxPrice) {
        this._valuePrice = this.maxPrice;
      } else if (value < this.minPrice) {
        this._valuePrice = this.minPrice;
      } else {
        this._valuePrice = value;
      }
    }

    constructor(
      private genreService: GenreService,
      private store: Store<mainReducer.State>
    ) {}

    ngOnInit() {
      this.genreService.all().subscribe((genres) => {
        this.mockGenres = genres;
      });
      this.genres = this.mockGenres;
    }
}
