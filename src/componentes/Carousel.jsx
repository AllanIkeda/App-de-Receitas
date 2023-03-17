import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css'; // este é o seu arquivo de estilos personalizados do Tailwind
// import RecomendationCard from './RecomendationCard';
import { STOP_ARRAY_RECOMENDATION } from '../Helpers/genericConsts';
import { recipeAPI } from '../services/api';

function Carousel({ thumb }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <button type="button" className="slick-next">a</button>,
    prevArrow: <button type="button" className="slick-prev">e</button>,
  };

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

  return (
    <div className="w-5/6 mb-14 mr-2">
      <Slider { ...settings }>
        {recomendations
          .map((recomendation, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="border-2 rounded-lg border-violet-300"
            >
              <h2
                data-testid={ `${index}-recommendation-title` }
                className="text-2xl text-center"
              >
                {Object.entries(recomendation)[1][1]}
              </h2>
              <img
                className=""
                src={ Object.entries(recomendation)[thumb][1] }
                alt={ Object.entries(recomendation)[1][1] }
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}

Carousel.propTypes = {
  thumb: PropTypes.number.isRequired,
};

export default Carousel;
