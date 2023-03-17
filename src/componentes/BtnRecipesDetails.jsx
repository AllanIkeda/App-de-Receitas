import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

function BtnRecipesDetails({ idRecipe, type, ingredients, AllChecked, recipeFull }) {
  const [isFinished, setIsFinished] = useState(false);
  const [startMessage, setStartMessage] = useState(true);
  const history = useHistory();
  const { pathname } = useLocation();
  const progress = pathname.split('/').splice(1);

  const listIngredients = ingredients.map((ingredient) => (
    { [ingredient]: false }
  ));
  const initialLocal = useCallback(() => {
    if (progress[2] === 'in-progress') {
      const prevStorage = JSON
        .parse(localStorage.getItem('inProgressRecipes') || '{}');
      if (type === 'meals') {
        localStorage
          .setItem('inProgressRecipes', JSON.stringify({
            drinks: {
              ...prevStorage.drinks || {},
            },
            meals: {
              ...prevStorage.meals,
              [idRecipe]: listIngredients,
            },
          }));
      } else {
        localStorage
          .setItem('inProgressRecipes', JSON.stringify({
            drinks: {
              ...prevStorage.drinks,
              [idRecipe]: listIngredients,
            },
            meals: {
              ...prevStorage.meals || {},
            },
          }));
      }
    } else if (AllChecked) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({
          drinks: {
          },
          meals: {
          },
        }));
    }
  }, [type, idRecipe, listIngredients, progress, AllChecked]);

  useEffect(() => {
    initialLocal();
  }, [initialLocal]);

  const startRecipe = (id, recipe) => {
    const prevStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '{}');
    if (recipe === 'meals') {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({
          drinks: {
            ...prevStorage.drinks || {},
          },
          meals: {
            ...prevStorage.meals,
            [id]: listIngredients,
          },
        }));
    } else {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({
          drinks: {
            ...prevStorage.drinks,
            [id]: listIngredients,
          },
          meals: {
            ...prevStorage.meals || {},
          },
        }));
    }

    setStartMessage(false);
    setIsFinished(false);
    history.push(`/${type}/${idRecipe}/in-progress`);
  };

  const doneRecipe = (recipe, recipetype) => {
    const typeSingular = recipetype === 'meals' ? 'meal' : 'drink';
    const prevStorage = JSON
      .parse(localStorage.getItem('doneRecipes') || '[]');
    const newRecipe = recipe.map((item) => {
      let tagsArray = [];
      if (item.strTags !== null) {
        tagsArray = item.strTags.includes(',') ? item.strTags.split(',')
          : [item.strTags];
      }

      const doneDate = new Date();
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const doneDateFormatted = doneDate.toLocaleDateString('pt-BR', options); // "14/03/2023"

      return ({
        id: item.idMeal || item.idDrink,
        nationality: item.strArea || '',
        name: item.strMeal || item.strDrink,
        category: item.strCategory,
        image: item.strMealThumb || item.strDrinkThumb,
        tags: tagsArray,
        alcoholicOrNot: item.strAlcoholic || '',
        type: typeSingular,
        doneDate: doneDateFormatted,
      });
    });

    localStorage
      .setItem('doneRecipes', JSON.stringify([
        ...prevStorage,
        newRecipe[0],
      ]));
    history.push('/done-recipes');
  };

  const getLocalStorage = useCallback(() => {
    const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (prevStorage !== null) {
      const isInProgress = Object.keys(prevStorage[type]).includes(idRecipe);
      setStartMessage(!isInProgress);
      setIsFinished(!isInProgress);
    }
  }, [type, idRecipe]);

  useEffect(() => {
    getLocalStorage();
  }, [getLocalStorage]);

  return (
    <div className="w-full active:bg-black flex items-center justify-center">
      <button
        className="fixed bottom-2 rounded-lg h-10 w-full bg-yellow-400 text-white
        font-semibold text-xl"
        style={ { position: 'fixed', bottom: 0, left: 0 } }
        data-testid={ `${progress[2] === 'in-progress' ? 'finish' : 'start'}-recipe-btn` }
        onClick={ AllChecked
          ? () => doneRecipe(recipeFull, type)
          : () => startRecipe(idRecipe, type) }
        disabled={ AllChecked ? !AllChecked : progress[2] }
      >
        { startMessage ? ('Start Recipe') : (
          <span>
            { isFinished || AllChecked ? 'finish recipe' : 'Continue Recipe' }
          </span>
        )}
      </button>
    </div>
  );
}

BtnRecipesDetails.propTypes = {
  idRecipe: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  AllChecked: PropTypes.bool.isRequired,
  recipeFull: PropTypes.arrayOf(Object).isRequired,
};

export default BtnRecipesDetails;
