import * as genreAction from '../action/genre.action';
import { GenreModel } from '../models/genre.model';

export interface State {
  selectedGenre: GenreModel;
}

export const initialState: State = {
  selectedGenre: null
};

export function reducer(
  state: State = initialState,
  action: genreAction.Actions
): State {
  switch (action.type) {
    case genreAction.SELECTED:
      return Object.assign({}, state, {
        selectedGenre: action.payload
      });
    default:
      return state;
  }
}

export const getSelectedGenre = (state: State) => state.selectedGenre;
