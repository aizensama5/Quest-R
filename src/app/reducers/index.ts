import * as roomReducer from './room.reducer';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { createSelector } from 'reselect';

export interface State {
  room: roomReducer.State;
}

export const reducers = {
  room: roomReducer.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

/**
 * Room Reducers
 */
export const getRoomState = (state: State) => state.room;

export const getRoom = createSelector(getRoomState, roomReducer.getSelectedRoom);



