import * as roomAction from '../action/room.action';
import { RoomModel } from '../models/room.model';

export interface State {
  selectedRoom: RoomModel;
}

export const initialState: State = {
  selectedRoom: null
};

export function reducer(
  state: State = initialState,
  action: roomAction.Actions
): State {
  switch (action.type) {
    case roomAction.SELECTED:
      return Object.assign({}, state, {
        selectedRoom: action.payload
      });
    default:
      return state;
  }
}

export const getSelectedRoom = (state: State) => state.selectedRoom;
