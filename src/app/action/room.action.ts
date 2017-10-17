import { Action } from '@ngrx/store';
import { RoomModel } from '../models/room.model';

export const SELECTED = '[RoomModel] Select';

export class Select implements Action {
  readonly type = SELECTED;

  constructor(public payload: RoomModel) {}
}

export type Actions = Select;
