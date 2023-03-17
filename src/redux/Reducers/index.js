import { combineReducers } from 'redux';
import categories from './categories';
import filtredRecipes from './filtredRecipes';
import doneRecipesRedux from './filteredDoneRecipe';

const rootReducer = combineReducers({ categories, filtredRecipes, doneRecipesRedux });

export default rootReducer;
