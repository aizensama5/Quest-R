import { Action } from '@ngrx/store';

export const SELECTED = '[number] Select';

export class Select implements Action {
  readonly type = SELECTED;

  constructor(public payload: number) {}
}

export type Actions = Select;
