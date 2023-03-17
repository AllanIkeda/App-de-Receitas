import { RECOMENDATION } from '../Actions/typeActions';

const INITIAL_STATE = {
  recomendationData: [],
};

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECOMENDATION:
    return {
      ...state,
      recomendationData: action.payload,
    };
  default:
    return state;
  }
};

export default categories;
