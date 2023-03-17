import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { STOP_ARRAY_RECIPES } from '../Helpers/genericConsts';
import { filtredRecipesAction } from '../redux/Actions';

function SearchBar() {
  const [filters, setFilters] = useState('');
  const [search, setSearch] = useState('');
  const history = useHistory();
  const FIRST_LETTER = 'First letter';
  const INGREDIENT = 'Ingredient';
  const NAME = 'Name';
  const typeRecipe = history.location.pathname;
  const dispatch = useDispatch();

  const handleChangeRadios = ({ target: { value } }) => {
    if (value === FIRST_LETTER && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setFilters(value);
  };

  const handleChangeSearch = ({ target: { value } }) => {
    if (filters === FIRST_LETTER && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    setSearch(value);
  };

  const mealsURL = () => {
    switch (filters) {
    case INGREDIENT:

      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;

    case NAME:

      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

    case FIRST_LETTER:

      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    default:
      break;
    }
  };

  const drinksURL = () => {
    switch (filters) {
    case INGREDIENT:

      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;

    case NAME:

      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;

    case FIRST_LETTER:

      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
    default:
      break;
    }
  };

  const handleClick = async () => {
    if (typeRecipe === '/meals') {
      try {
        const url = mealsURL();
        const response = await fetch(url);
        const data = await response.json();
        if (data.meals.length === 1) {
          history.push(`/meals/${data.meals[0].idMeal}`);
        } else if (data.meals.length > STOP_ARRAY_RECIPES) {
          const resultsRecipe = data.meals.slice(0, STOP_ARRAY_RECIPES);
          dispatch(filtredRecipesAction(resultsRecipe));
        } else {
          const resultsRecipe = data.meals;
          dispatch(filtredRecipesAction(resultsRecipe));
        }
      } catch (error) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        console.log(error);
      }
    } else {
      try {
        const url = drinksURL();
        const response = await fetch(url);
        const data = await response.json();
        if (data.drinks.length === 1) {
          history.push(`/drinks/${data.drinks[0].idDrink}`);
        } else if (data.drinks.length > STOP_ARRAY_RECIPES) {
          const resultsRecipe = data.drinks.slice(0, STOP_ARRAY_RECIPES);
          dispatch(filtredRecipesAction(resultsRecipe));
        } else {
          const resultsRecipe = data.drinks;
          dispatch(filtredRecipesAction(resultsRecipe));
        }
      } catch (error) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        console.log(error);
      }
    }
  };

  return (
    <form
      className="bg-violet-900 h-36 w-11/12 rounded-3xl
      flex flex-col justify-between mb-2"
    >
      <label htmlFor="search">
        <input
          className="w-full py-2 px-6 border rounded-xl"
          id="search"
          data-testid="search-input"
          type="text"
          placeholder="Search"
          value={ search }
          onChange={ (e) => handleChangeSearch(e) }
        />
      </label>
      <section
        className="w-4/5 flex text-white place-self-center
        justify-between items-center"
      >
        <label>
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            value="Ingredient"
            name="searchFilter"
            onChange={ (e) => handleChangeRadios(e) }
          />
          Ingredient
        </label>
        <label>
          <input
            data-testid="name-search-radio"
            type="radio"
            value="Name"
            name="searchFilter"
            onChange={ (e) => handleChangeRadios(e) }
          />
          Name
        </label>
        <label>
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            value="First letter"
            name="searchFilter"
            onChange={ (e) => handleChangeRadios(e) }
          />
          First letter
        </label>
      </section>
      <button
        className="w-4/5 place-self-center text-white font-bold
        text-xl h-10 mb-3 bg-yellow-400 rounded-lg"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
