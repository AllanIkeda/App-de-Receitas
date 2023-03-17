import { DONE_RECIPES } from '../Actions/typeActions';

const INITIAL_STATE = {
  doneRecipesFilter: [],
};

const doneRecipesRedux = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DONE_RECIPES:
    return {
      ...state,
      doneRecipesFilter: action.payload,
    };
  default:
    return state;
  }
};

export default doneRecipesRedux;
