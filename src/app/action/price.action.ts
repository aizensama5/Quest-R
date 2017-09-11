import { Action } from '@ngrx/store';
import { SelectedPriceModel } from '../models/selected-price.model';

export const SELECTED = '[SelectedPriceModel] Select';

export class Select implements Action {
  readonly type = SELECTED;

  constructor(public payload: SelectedPriceModel) {}
}

export type Actions = Select;
