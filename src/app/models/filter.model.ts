import { ComplexityModel} from './complexity.model';
import { GenreModel } from './genre.model';
import { MarkingModel } from './marking.model';
import { EventEmitter } from '@angular/core';

export class FilterModel {
  private _complexity: ComplexityModel[] = [];
  private _countPlayers = 0;
  private _genre: GenreModel = new GenreModel();
  private _price = 0;
  private _marking: MarkingModel[] = [];

  filterChange: EventEmitter<FilterModel> = new EventEmitter<FilterModel>();

  constructor() {}

  get genre(): GenreModel {
    return this._genre;
  }

  set genre(value: GenreModel) {
    this._genre = value;
    this.filterChange.emit(this);
  }

  get complexity(): ComplexityModel[] {
    return this._complexity;
  }

  set complexity(value: ComplexityModel[]) {
    this._complexity = value;
    this.filterChange.emit(this);
  }

  get marking(): MarkingModel[] {
    return this._marking;
  }

  set marking(value: MarkingModel[]) {
    this._marking = value;
    this.filterChange.emit(this);
  }

  get countPlayers(): number {
    return this._countPlayers;
  }

  set countPlayers(value: number) {
    this._countPlayers = value;
    this.filterChange.emit(this);
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
    this.filterChange.emit(this);
  }
}
