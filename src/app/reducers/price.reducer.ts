import * as priceAction from '../action/price.action';

export interface State {
  selectedPrice: number;
}

export const initialState: State = {
  selectedPrice: null
};

export function reducer(
  state: State = initialState,
  action: priceAction.Actions
): State {
  switch (action.type) {
    case priceAction.SELECTED:
      return Object.assign({}, state, {
        selectedPrice: action.payload
      });
    default:
      return state;
  }
}

export const getSelectedPrice = (state: State) => state.selectedPrice;
