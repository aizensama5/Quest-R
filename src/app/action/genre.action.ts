import { Action } from '@ngrx/store';
import { GenreModel } from '../models/genre.model';

export const SELECTED = '[GenreModel] Select';

export class Select implements Action {
  readonly type = SELECTED;

  constructor(public payload: GenreModel) {}
}

export type Actions = Select;
