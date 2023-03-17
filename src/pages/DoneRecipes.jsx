import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import BtnDneRecipes from '../componentes/BtnDneRecipes';
import Header from '../componentes/Header';
import ShareImage from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const doneRecipesRedux = useSelector((state) => state.doneRecipesRedux);
  const { doneRecipesFilter } = doneRecipesRedux;

  const shareRecipe = (recipeType, id) => {
    copy(`http://localhost:3000/${recipeType}s/${id}`);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Link copied!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const getDoneRecipes = () => {
    const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    return doneRecipesLocal;
  };

  useEffect(() => {
    if (doneRecipesFilter.length > 0) {
      setDoneRecipes(doneRecipesFilter);
    } else {
      setDoneRecipes(getDoneRecipes());
    }
  }, [doneRecipesFilter]);

  return (
    <main className="flex flex-col items-center">
      <Header />
      <BtnDneRecipes />
      <div
        className="flex w-11/12 flex-col
        items-center justify-center"
      >
        {doneRecipes && doneRecipes.map((recipe, index) => (
          <div
            className="flex w-full overflow-hidden rounded-xl
            place-self-center justify-between border-2 my-2 h-40"
            key={ index }
          >
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="w-64"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <div className="flex flex-col w-full justify-evenly items-center">
              <div className="flex ">
                <Link to={ `/${recipe.type}s/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <label htmlFor="share">
                  <button
                    type="button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ ShareImage }
                    alt="share"
                    onClick={ () => shareRecipe(recipe.type, recipe.id) }
                  >
                    <img src={ ShareImage } alt="share" />
                  </button>
                </label>
              </div>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : recipe.alcoholicOrNot}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <div className="flex">
                {recipe.tags.map((tag, indexTag) => (
                  <p
                    className="bg-gray-300 mx-1 w-16
                    text-center text-gray-700 rounded-3xl"
                    key={ indexTag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                )) }
              </div>
            </div>

          </div>
        ))}

      </div>
    </main>
  );
}

export default connect()(DoneRecipes);
