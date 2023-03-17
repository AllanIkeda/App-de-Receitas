import {
  FILTRED_RECIPES,
  SELECTED_CATEGORY,
  UPDATE_FAVORITE,
  DONE_RECIPES,
} from './typeActions';

export const selectedCategory = (payload) => ({
  type: SELECTED_CATEGORY,
  payload,
});

export const filtredRecipesAction = (payload) => ({
  type: FILTRED_RECIPES,
  payload,
});

export const updateFavorite = () => ({ type: UPDATE_FAVORITE });

export const doneRecipes = (payload) => ({
  type: DONE_RECIPES,
  payload,
});
