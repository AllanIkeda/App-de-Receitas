import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import ShareImage from '../images/shareIcon.svg';
import UnfavoriteImage from '../images/whiteHeartIcon.svg';
import FavoriteImage from '../images/blackHeartIcon.svg';
import { updateFavorite } from '../redux/Actions';

function BtnShareAndFavorite({ recipe, recipeType, id, favoriteId, shareId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const shareRecipe = () => {
    copy(`http://localhost:3000/${recipeType}/${id}`);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Link copied!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const favoriteRecipe = () => {
    const prevStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    if (prevStorage.some((prevId) => prevId.id === id)) {
      const favoriteRemoved = prevStorage.filter((prevId) => prevId.id !== id);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(favoriteRemoved));
      setIsFavorite(false);
      dispatch(updateFavorite());

      return null;
    }

    if (recipeType === 'meals') {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipe[0];
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...prevStorage, {
          id: idMeal,
          type: 'meal',
          nationality: strArea || '',
          category: strCategory || '',
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        }]));
      setIsFavorite(true);
    } else {
      const { idDrink, strAlcoholic, strCategory, strDrink, strDrinkThumb } = recipe[0];
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...prevStorage, {
          id: idDrink,
          type: 'drink',
          nationality: '',
          category: strCategory || '',
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        }]));
      setIsFavorite(true);
    }
  };

  const checkIsFavorite = useCallback(() => {
    const prevStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes') || '[]');

    const favoriteResult = prevStorage.some((prevId) => prevId.id === id);
    setIsFavorite(favoriteResult);
  }, [id]);

  useEffect(() => {
    checkIsFavorite();
  }, [checkIsFavorite]);

  return (
    <div
      className="absolute inset-x-3/4
      w-24 h-16 z-40 flex justify-around items-center"
    >
      <button onClick={ shareRecipe }>
        <img
          className="w-8"
          src={ ShareImage }
          data-testid={ shareId }
          alt="Share Recipe"
        />
      </button>
      <button
        onClick={ favoriteRecipe }
      >
        <img
          className="w-8"
          data-testid={ favoriteId }
          src={ isFavorite ? FavoriteImage : UnfavoriteImage }
          alt="Favorite Recipe"
        />
      </button>
    </div>
  );
}

BtnShareAndFavorite.propTypes = {
  recipe: PropTypes.arrayOf(Object).isRequired,
  recipeType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  favoriteId: PropTypes.string.isRequired,
  shareId: PropTypes.string.isRequired,
};

export default BtnShareAndFavorite;
