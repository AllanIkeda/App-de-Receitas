import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { doneRecipes } from '../redux/Actions/index';

function BtnDneRecipes() {
  const [Recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();

  const filterByMeal = () => {
    const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes' || '[]'));
    const meals = doneRecipesLocal.filter((recipe) => recipe.type === 'meal');
    setRecipes(meals);
  };

  const filterByDrink = () => {
    const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes' || '[]'));
    const drinks = doneRecipesLocal.filter((recipe) => recipe.type === 'drink');
    setRecipes(drinks);
  };

  const resetFilter = () => {
    setRecipes([]);
  };

  useEffect(() => {
    dispatch(doneRecipes(Recipes));
  }, [dispatch, Recipes]);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => resetFilter() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => filterByMeal() }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterByDrink() }
      >
        Drinks
      </button>
    </div>
  );
}

export default BtnDneRecipes;
