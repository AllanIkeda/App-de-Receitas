import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BtnShareAndFavorite from '../componentes/BtnShareAndFavorite';
import Header from '../componentes/Header';

function FavoriteRecipes() {
  const history = useHistory();
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [initial, setInitial] = useState([]);

  const update = useSelector((state) => state.categories.update);

  const filterAll = () => {
    setFilteredFoods(initial);
  };

  const filterMeals = () => {
    const initialArr = [...initial];
    const filtered = initialArr.filter(({ type }) => type === 'meal');
    setFilteredFoods(filtered);
  };

  const filterDrinks = () => {
    const initialArr = [...initial];
    const filtered = initialArr.filter(({ type }) => type === 'drink');
    setFilteredFoods(filtered);
  };

  const redirectRecipe = (type, id) => {
    history.push(`/${type}s/${id}`);
  };
  const checkIsFavorite = useCallback(() => {
    const prevStorage = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    if (prevStorage === null) {
      setFilteredFoods([]);
      setInitial([]);
      return true;
    }

    setFilteredFoods(prevStorage);
    setInitial(prevStorage);
  }, [setInitial]);

  useEffect(() => {
    checkIsFavorite();
  }, [checkIsFavorite, update]);

  console.log('fora', filteredFoods);

  return (
    <>
      <Header />
      <main>
        <div>
          <button
            data-testid="filter-by-all-btn"
            onClick={ filterAll }
          >
            All
          </button>

          <button
            data-testid="filter-by-meal-btn"
            onClick={ filterMeals }
          >
            Meals
          </button>

          <button
            data-testid="filter-by-drink-btn"
            onClick={ filterDrinks }
          >
            Drinks
          </button>
          <div>
            {
              filteredFoods.map(({
                id,
                type,
                nationality,
                category,
                alcoholicOrNot,
                name,
                image,
              }, index) => (
                <div key={ index }>

                  <h2 data-testid={ `${index}-horizontal-top-text` }>
                    {nationality || alcoholicOrNot}
                    {' '}
                    -
                    {' '}
                    {category}
                  </h2>
                  <button onClick={ () => redirectRecipe(type, id) }>
                    <h3
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {name}
                    </h3>
                  </button>
                  <input
                    type="image"
                    style={ { width: '100px' } }
                    src={ image }
                    alt={ name }
                    data-testid={ `${index}-horizontal-image` }
                    onClick={ () => redirectRecipe(type, id) }
                  />
                  <BtnShareAndFavorite
                    recipe={
                      [{
                        [type === 'meal' ? 'idMeal' : 'idDrink']: id,
                        nationality,
                        category,
                        alcoholicOrNot,
                        [type === 'meal' ? 'strMeal' : 'strDrink']: name,
                        [type === 'meal' ? 'strMealThumb' : 'strDrinkThumb']: image,
                      }]
                    }
                    recipeType={ `${type}s` }
                    id={ id }
                    favoriteId={ `${index}-horizontal-favorite-btn` }
                    shareId={ `${index}-horizontal-share-btn` }
                  />
                </div>
              ))
            }
          </div>
        </div>
      </main>
    </>
  );
}

export default FavoriteRecipes;
