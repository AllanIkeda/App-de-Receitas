import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { STOP_ARRAY_RECOMENDATION } from '../Helpers/genericConsts';
import { recipeAPI } from '../services/api';

function RecomendationCard({ thumb }) {
  const [recomendations, setRecomendation] = useState([]);

  const { pathname } = useLocation();
  const [recipeType] = pathname.split('/').splice(1);

  const recomendationType = recipeType === 'meals'
    ? 'Drinks' : 'Meals';

  const apiComponent = useCallback(async () => {
    const recomendationURL = recipeType === 'meals'
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const resultRecomendation = await recipeAPI(recomendationURL);

    const spliced = resultRecomendation[recomendationType.toLocaleLowerCase()]
      .slice(0, STOP_ARRAY_RECOMENDATION);

    setRecomendation(spliced);
  }, [recipeType, recomendationType]);

  useEffect(() => {
    apiComponent();
  }, [apiComponent]);

  return recomendations
    .map((recomendation, index) => (
      <div
        key={ index }
        data-testid={ `${index}-recommendation-card` }
        className="carousel-item"
      >
        <h2 data-testid={ `${index}-recommendation-title` }>
          {Object.entries(recomendation)[1][1]}
        </h2>
        <img
          className="carousel-img"
          src={ Object.entries(recomendation)[thumb][1] }
          alt={ Object.entries(recomendation)[1][1] }
        />
      </div>
    ));
}

export default RecomendationCard;
