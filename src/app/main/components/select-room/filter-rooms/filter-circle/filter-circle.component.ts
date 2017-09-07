import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import {GenreService} from '../../../../../service/genre.service';
import {GenreModel} from '../../../../../models/genre.model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
    moduleId: module.id,
    selector: 'app-main-filter-circle',
    templateUrl: 'filter-circle.component.html',
    styleUrls: ['filter-circle.component.scss'],
    animations: [
      trigger('circleAnimation',
        [
          state('start', style({
            transform: 'rotate(0deg)'
          })),
          state('finish', style({
            transform: 'rotate(360deg)'
          })),
          transition('start => finish', animate('500ms ease-in'))
        ]),
    ]
})
export class FilterCircleComponent implements OnInit {

    @Input() displayPlayersCircle: boolean;
    @Input() displayGenreCircle: boolean;
    @Input() displayPriceCircle: boolean;

    minCountPlayers = 0;
    maxCountPlayers = 8;

    priceValueStep = 10;
    playerValueStep = 1;

    minPrice = 0;
    maxPrice = 100;

    _state: string;

    priceStep = 36;
    playerStep = 360 / this.maxCountPlayers;

    genres: GenreModel[];

    @ViewChild('input') input: ElementRef;

    private _value = 0;
    private _genre: any;

    set valuePlayers(value: number) {
        if (value > this.maxCountPlayers) {
            this._value = this.maxCountPlayers;
        } else if (value < this.minCountPlayers) {
            this._value = this.minCountPlayers;
        } else {
            this._value = value;
        }
        setTimeout(() => {
            this.input.nativeElement.value = this._value;
        });
    }

    get valuePlayers(): number {
        return this._value;
    }

    set valuePrice(value: number) {
      if (value > this.maxPrice) {
        this._value = this.maxPrice;
      } else if (value < this.minPrice) {
        this._value = this.minPrice;
      } else {
        this._value = value;
      }
      setTimeout(() => {
        this.input.nativeElement.value = this._value;
      });
    }

    get valuePrice(): number {
      return this._value;
    }

    set selectedGenre(genre: any) {
        this._genre = genre;
    }

    get selectedGenre(): any {
        return this._genre;
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

    constructor(private genreService: GenreService) {}

    ngOnInit() {
      this.genreService.all().subscribe((genres) => {
        this.mockGenres = genres;
      });
      this.genres = this.mockGenres;
    }
}
