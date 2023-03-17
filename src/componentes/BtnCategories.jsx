import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { STOP_ARRAY_CATEGORIES } from '../Helpers/genericConsts';
import { selectedCategory } from '../redux/Actions';
import { drinksCategoriesApi, mealsCategoriesApi } from '../services/api';

function BtnCategories() {
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [currentCategory, setcurrentCategory] = useState('');

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const apiCategories = async () => {
    const resultMealsCategories = await mealsCategoriesApi();
    setMealsCategories(resultMealsCategories.meals);

    const resultDrinksCategories = await drinksCategoriesApi();
    setDrinksCategories(resultDrinksCategories.drinks);
  };

  const handleClick = ({ target }) => {
    if (target.innerText === currentCategory) {
      dispatch(selectedCategory(''));
      setcurrentCategory('');
    } else {
      dispatch(selectedCategory(target.innerText));
      setcurrentCategory(target.innerText);
    }
  };

  useEffect(() => {
    apiCategories();
  }, []);

  useEffect(() => {
  }, []);

  return (
    <div className="flex">
      {
        pathname === '/meals' ? (
          mealsCategories.slice(0, STOP_ARRAY_CATEGORIES)
            .map(
              (categorie) => (
                <button
                  className="border-yellow-500 border bg-yellow-400 py-2 px-1 text-white
                  w-full h-16 font-bold flex items-center justify-center"
                  data-testid={ `${categorie.strCategory}-category-filter` }
                  key={ categorie.strCategory }
                  type="button"
                  onClick={ (e) => handleClick(e) }
                >
                  { categorie.strCategory }
                </button>
              ),
            )
        ) : (
          drinksCategories.slice(0, STOP_ARRAY_CATEGORIES)
            .map(
              (categorie) => (
                <button
                  className="border-yellow-500 border bg-yellow-400 py-2 px-1 text-white
                  h-16 font-bold flex w-full items-center justify-center"
                  data-testid={ `${categorie.strCategory}-category-filter` }
                  key={ categorie.strCategory }
                  type="button"
                  onClick={ (e) => handleClick(e) }
                >
                  { categorie.strCategory }
                </button>
              ),
            )
        )
      }
    </div>
  );
}

export default connect(null)(BtnCategories);
