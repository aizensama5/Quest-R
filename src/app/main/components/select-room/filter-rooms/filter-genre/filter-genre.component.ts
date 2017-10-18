import {Component, EventEmitter, OnInit, Output, Input, HostListener} from '@angular/core';
import { GenreModel } from '../../../../../models/genre.model';

@Component({
  moduleId: module.id,
  selector: 'app-filter-genre',
  templateUrl: 'filter-genre.component.html',
  styleUrls: ['filter-genre.component.scss']
})
export class FilterGenreComponent implements OnInit {
  private _genre: GenreModel;
  @Output() onChangeGenre: EventEmitter<GenreModel> = new EventEmitter<GenreModel>();
  @Input() roundCircleParams: any;

  set selectedGenre(genre: GenreModel) {
    this._genre = genre;
    setTimeout(() => {
      this.onChangeGenre.emit(genre);
    });
  }

  @Input()
  get selectedGenre(): GenreModel {
    return this._genre;
  }

  constructor() {
  }

  ngOnInit() {
    console.log(this.roundCircleParams);
  }
}
