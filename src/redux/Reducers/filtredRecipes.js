import { FILTRED_RECIPES } from '../Actions/typeActions';

const INITIAL_STATE = {
  recipes: [],
};

const filtredRecipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FILTRED_RECIPES:
    return {
      ...state,
      recipes: action.payload,
    };

  default:
    return state;
  }
};
export default filtredRecipes;
