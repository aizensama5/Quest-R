import * as playersAction from '../action/players.action';

export interface State {
  selectedCountPlayers: number;
}

export const initialState: State = {
  selectedCountPlayers: null
};

export function reducer(
  state: State = initialState,
  action: playersAction.Actions
): State {
  switch (action.type) {
    case playersAction.SELECTED:
      return Object.assign({}, state, {
        selectedCountPlayers: action.payload
      });
    default:
      return state;
  }
}

export const getSelectedCountPlayers = (state: State) => state.selectedCountPlayers;
