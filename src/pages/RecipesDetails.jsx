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
            <main className="recipe-details-main" key={ idMeal }>
              <div className="recipe-details-container">
                <h2
                  className="recipe-title"
                  data-testid="recipe-title"
                >
                  {strMeal}
                </h2>
                <img
                  className="recipe-img"
                  data-testid="recipe-photo"
                  src={ strMealThumb }
                  alt={ strMeal }
                />
                <h3 data-testid="recipe-category">{strCategory}</h3>
              </div>
              <div className="my-8 w-11/12">
                <h2 className="recipe-title-ingredient">Ingredients</h2>
                <ul
                  className="recipe-ingredient-list"
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
                <h2 className="recipe-title-ingredient">Instructions</h2>
                <p
                  className="recipe-border"
                  data-testid="instructions"
                >
                  {strInstructions}
                </p>
              </div>
              <div className="w-11/12 mb-8">
                <h2 className="recipe-title-ingredient">Video</h2>
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
            <main className="recipe-details-main" key={ idDrink }>
              <div className="recipe-details-container">
                <h2
                  className="recipe-title"
                  data-testid="recipe-title"
                >
                  {strDrink}
                </h2>
                <img
                  className="recipe-img"
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
                <h2 className="recipe-title-ingredient">Ingredients</h2>
                <ul
                  className="recipe-ingredient-list"
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
                <h2 className="recipe-title-ingredient">Instructions</h2>
                <p
                  className="recipe-border "
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
