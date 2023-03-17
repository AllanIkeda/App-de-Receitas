import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BtnRecipesDetails from '../componentes/BtnRecipesDetails';
import BtnShareAndFavorite from '../componentes/BtnShareAndFavorite';
import { detailsRecipesApi } from '../services/api';
import Carousel from '../componentes/Carousel';
import './styles/RecipesDetails.css';

function RecipesDetails() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [AllChecked, setAllChecked] = useState(false);

  const { pathname } = useLocation();
  //* Destructuring pathname
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

  useEffect(() => {
    api();
    setAllChecked(false);
  }, [api]);

  return (
    <div>
      <BtnShareAndFavorite
        recipe={ recipe }
        recipeType={ recipeType }
        id={ id }
        favoriteId="favorite-btn"
        shareId="share-btn"
      />
      {recipeType === 'meals' ? (
        recipe
          .map((
            { idMeal, strMealThumb, strMeal, strCategory, strInstructions, strYoutube },
          ) => (
            <main className="flex flex-col items-center" key={ idMeal }>
              <div className="w-screen h-64 overflow-hidden">
                <h2
                  className="text-white font-bold text-4xl flex items-center decoration
                  absolute z-40 h-10 w-48 inset-x-28 inset-y-24 justify-center"
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
                <h2 className="ml-4 text-2xl font-semibold">Ingredients</h2>
                <ul
                  className="text-xl list-disc list-inside
                  w-full p-4 my-3 border-2 rounded-lg"
                >
                  {ingredients.map((ingredient, idx) => (
                    <li
                      className="my-5"
                      key={ idx }
                      data-testid={ `${idx}-ingredient-name-and-measure` }
                    >
                      {ingredient}
                      {' '}
                      {measure[idx]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-11/12 mb-8">
                <h2 className="ml-4 text-2xl font-semibold">Instructions</h2>
                <p
                  className="text-xl w-full p-6 my-3 border-2 rounded-lg"
                  data-testid="instructions"
                >
                  {strInstructions}
                </p>
              </div>
              <div className="w-11/12 mb-8">
                <h2 className="ml-4 mb-2 text-2xl font-semibold">Video</h2>
                <iframe
                  className="w-full h-72"
                  data-testid="video"
                  src={ `https://www.youtube.com/embed/${strYoutube.split('v=')[1]}` }
                  allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <Carousel thumb={ 16 } />
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
            <main className="flex flex-col items-center" key={ idDrink }>
              <div className="w-screen h-64 overflow-hidden">
                <h2
                  className="text-white font-bold text-4xl flex items-center decoration
                  absolute z-40 h-10 w-48 inset-x-28 inset-y-24 justify-center"
                  data-testid="recipe-title"
                >
                  {strDrink}
                </h2>
                <img
                  className="w-screen relative brightness-75"
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
                <h2 className="ml-4 text-2xl font-semibold">Ingredients</h2>
                <ul
                  className="text-xl list-disc list-inside
                  w-full p-4 my-3 border-2 rounded-lg"
                >
                  {ingredients.map((ingredient, idx) => (
                    <li
                      className="my-5"
                      key={ idx }
                      data-testid={ `${idx}-ingredient-name-and-measure` }
                    >
                      {ingredient}
                      {measure[idx]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-11/12 mb-8">
                <h2 className="ml-4 text-2xl font-semibold">Instructions</h2>
                <p
                  className="text-xl w-full p-6 my-3 border-2 rounded-lg"
                  data-testid="instructions"
                >
                  {strInstructions}
                </p>
              </div>
              <Carousel thumb={ 6 } />
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

export default RecipesDetails;
