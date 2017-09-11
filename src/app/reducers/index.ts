import * as roomReducer from './room.reducer';
import * as genreReducer from './genre.reducer';
import * as playersReducer from './players.reducer';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { createSelector } from 'reselect';

export interface State {
  room: roomReducer.State;
  genre: genreReducer.State;
  countPlayers: playersReducer.State;
}

export const reducers = {
  room: roomReducer.reducer,
  genre: genreReducer.reducer,
  playersCount: playersReducer.reducer
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

/**
 * Genre Reducers
 */
export const getGenreState = (state: State) => state.genre;

export const getGenre = createSelector(getGenreState, genreReducer.getSelectedGenre);


/**
 * Players Reducers
 */
export const getPlayersState = (state: State) => state.countPlayers;

export const getCountPlayers = createSelector(getPlayersState, playersReducer.getSelectCountPlayers);





