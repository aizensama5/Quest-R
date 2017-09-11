import { Action } from '@ngrx/store';
import { SelectedPlayersCountModel } from '../models/selected-playersCount.model';

export const SELECTED = '[SelectedPlayersCountModel] Select';

export class Select implements Action {
  readonly type = SELECTED;

  constructor(public payload: SelectedPlayersCountModel) {}
}

export type Actions = Select;
