import { SELECTED_CATEGORY, UPDATE_FAVORITE } from '../Actions/typeActions';

const INITIAL_STATE = {
  category: '',
  update: false,
};

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SELECTED_CATEGORY:
    return {
      ...state,
      category: action.payload,
    };
  case UPDATE_FAVORITE:
    return {
      ...state,
      update: !state.update,
    };
  default:
    return state;
  }
};

export default categories;
