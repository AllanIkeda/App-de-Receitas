/* eslint-disable max-lines */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { detailsRecipesApi } from '../services/api';

import BtnShareAndFavorite from '../componentes/BtnShareAndFavorite';
import BtnRecipesDetails from '../componentes/BtnRecipesDetails';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [AllChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const { pathname } = useLocation();
  const [recipeType, id] = pathname.split('/').splice(1);

  const api = useCallback(async () => {
    const recipeURL = recipeType === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const result = await detailsRecipesApi(recipeURL);
    setRecipe(result[recipeType]);

    const ingredientsArray = Object
      .entries(result[recipeType][0])
      .filter((e) => e[0]
        .includes('strIngredient') && e[1] !== '' && e[1] !== null)
      .map((e) => e[1]);
    setIngredients(ingredientsArray);

    const measureArray = Object
      .entries(result[recipeType][0])
      .filter((e) => e[0]
        .includes('strMeasure') && e[1] !== '' && e[1] !== null)
      .map((e) => e[1]);
    setMeasure(measureArray);
  }, [recipeType, id]);

  const DidMountLocal = useCallback(async (item, isChecked) => {
    const storage = await JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientsListStorage = storage[recipeType][id];
    const newIngredientsList = ingredientsListStorage.map((ingredient) => {
      if (item === Object.keys(ingredient)[0]) {
        return { [item]: isChecked };
      }
      return ingredient;
    });
    const newStorage = {
      ...storage,
      [recipeType]: {
        ...storage[recipeType],
        [id]: newIngredientsList,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }, [recipeType, id]);

  const handleCheck = async (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    DidMountLocal(item, isChecked);
    setCheckedItems({ ...checkedItems, [item]: isChecked });
  };

  const getStorage = useCallback(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storage && storage[recipeType] && storage[recipeType][id]) {
      const ingredientsList = storage[recipeType][id];
      const checkedI = ingredientsList.reduce((acc, ingredient) => {
        const [key, value] = Object.entries(ingredient)[0];
        return { ...acc, [key]: value };
      }, {});
      setCheckedItems(checkedI);
    }
  }, [recipeType, id]);

  const changeAllChecked = useCallback(() => {
    const allChecked = Object.values(checkedItems).every((item) => item !== false);
    if (ingredients.length === Object.keys(checkedItems).length && allChecked) {
      setAllChecked(allChecked);
    } else {
      setAllChecked(false);
    }
  }, [checkedItems, ingredients, setAllChecked]);

  useEffect(() => {
    changeAllChecked();
  }, [checkedItems, changeAllChecked]);

  useEffect(() => {
    api();
    getStorage();
  }, [api, getStorage]);

  return (
    <div>
      <div>
        <BtnShareAndFavorite
          recipe={ recipe }
          recipeType={ recipeType }
          id={ id }
          favoriteId="favorite-btn"
          shareId="share-btn"
        />
      </div>

      {recipeType === 'meals' ? (
        recipe
          .map((
            { idMeal, strMealThumb, strMeal, strCategory, strInstructions, strYoutube },
          ) => (
            <main className="inprogress-main" key={ idMeal }>
              <div className="inprogress-title-container">
                <h2
                  className="inprogress-title"
                  data-testid="recipe-title"
                >
                  {strMeal}
                </h2>
                <img
                  className="w-screen relative brightness-75"
                  data-testid="recipe-photo"
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <h3 data-testid="recipe-category">{strCategory}</h3>
              </div>
              <div className="my-8 w-11/12">
                <h2 className="inprogress-title-ingredient">Ingredients</h2>
                <ul
                  className="inprogress-ingredient-list"
                >
                  {ingredients.map((ingredient, idx) => (
                    <label
                      htmlFor={ `${ingredient}${idx}` }
                      key={ idx }
                      data-testid={ `${idx}-ingredient-step` }
                      className={ checkedItems[ingredient] ? 'line-through' : 'flex' }
                    >
                      <input
                        id={ `${ingredient}${idx}` }
                        name={ `${ingredient}` }
                        type="checkbox"
                        checked={ checkedItems[ingredient] }
                        onChange={ handleCheck }
                      />
                      <li
                        className="my-5"
                        data-testid={ `${idx}-ingredient-name-and-measure` }
                      >
                        {ingredient}
                        {' '}
                        {measure[idx]}
                      </li>
                    </label>
                  ))}
                </ul>
              </div>
              <div className="w-11/12 mb-8">
                <h2 className="inprogress-title-ingredient">Instructions</h2>
                <p
                  data-testid="instructions"
                  className="inprogress-border"
                >
                  {strInstructions}
                </p>
              </div>
              <div className="w-11/12 mb-16">
                <h2 className="inprogress-title-ingredient">Video</h2>
                <iframe
                  data-testid="video"
                  className="w-full h-72"
                  src={ `https://www.youtube.com/embed/${strYoutube.split('v=')[1]}` }
                  allow="accelerometer; autoplay; clipboard-write;
                    encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <BtnRecipesDetails
                idRecipe={ idMeal }
                type="meals"
                ingredients={ ingredients }
                AllChecked={ AllChecked }
                recipeFull={ recipe }
              />
            </main>
          ))
      ) : (
        recipe
          .map((
            { idDrink,
              strDrink,
              strDrinkThumb,
              strCategory,
              strInstructions,
              strAlcoholic,
            },
          ) => (
            <main
              className="inprogress-main"
              key={ idDrink }
            >
              <div className="inprogress-title-container">
                <h2
                  className="inprogress-title"
                  data-testid="recipe-title"
                >
                  {strDrink}
                </h2>
                <img
                  className="inprogress-img"
                  data-testid="recipe-photo"
                  src={ strDrinkThumb }
                  alt={ strDrink }
                />
                <h3 data-testid="recipe-category">
                  {strCategory}
                  {' '}
                  { strAlcoholic}
                </h3>
              </div>
              <div className="my-8 w-11/12">
                <h2 className="inprogress-title-ingredient">Ingredients</h2>
                <ul
                  className="inprogress-ingredient-list"
                >
                  {ingredients.map((ingredient, idx) => (
                    <label
                      htmlFor={ `${ingredient}${idx}` }
                      key={ idx }
                      data-testid={ `${idx}-ingredient-step` }
                      className={ checkedItems[ingredient] ? 'line-through' : 'flex' }
                    >
                      <input
                        className="mr-2"
                        id={ `${ingredient}${idx}` }
                        name={ `${ingredient}` }
                        type="checkbox"
                        checked={ checkedItems[ingredient] }
                        onChange={ handleCheck }
                      />
                      <li
                        className="my-5"
                        data-testid={ `${idx}-ingredient-name-and-measure` }
                      >
                        {ingredient}
                        {measure[idx]}
                      </li>
                    </label>
                  ))}
                </ul>
              </div>
              <div className="w-11/12 mb-8">
                <h2 className="inprogress-title-ingredient">Instructions</h2>
                <p
                  className="inprogress-border"
                  data-testid="instructions"
                >
                  {strInstructions}
                </p>
              </div>
              <BtnRecipesDetails
                idRecipe={ idDrink }
                type="drinks"
                ingredients={ ingredients }
                AllChecked={ AllChecked }
                recipeFull={ recipe }
              />
            </main>
          ))
      )}
    </div>
  );
}

export default RecipeInProgress;
