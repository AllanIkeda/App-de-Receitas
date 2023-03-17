// import { useState } from 'react';
import { STOP_ARRAY_RECIPES } from './genericConsts';
import { recipeAPI } from '../services/api';

export const ApiCheck = async (pathname, endPoint, typeRicepe) => {
  try {
    let URL_RECIPE = pathname === '/meals'
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${endPoint}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${endPoint}`;
    if (!endPoint) {
      URL_RECIPE = pathname === '/meals'
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }
    const results = await recipeAPI(URL_RECIPE);
    if (results[typeRicepe]?.length > STOP_ARRAY_RECIPES) {
      const resultsRecipe = results[typeRicepe].slice(0, STOP_ARRAY_RECIPES);
      return (resultsRecipe);
    }
    const resultsRecipe = results[typeRicepe];
    return (resultsRecipe);
  } catch (error) {
    return '';
  }
};
