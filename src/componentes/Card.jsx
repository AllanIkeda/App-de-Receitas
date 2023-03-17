import React from 'react';
import PropTypes from 'prop-types';

function Card({ param, idx }) {
  return (
    <div
      className="w-64 h-72 flex flex-col-reverse my-2
      border-violet-400 border-2 rounded-lg
      justify-between items-center overflow-hidden"
      data-testid={ `${idx}-recipe-card` }
    >
      <div
        className="flex border-t-violet-400 border 2
        justify-center items-center h-full w-full"
      >
        <h2
          className="text-xl font-semibold text-violet-900"
          data-testid={ `${idx}-card-name` }
        >
          {param.strMeal ? param.strMeal : param.strDrink}
        </h2>
      </div>
      <img
        className="w-64 h-64"
        src={ param.strMealThumb ? param.strMealThumb : param.strDrinkThumb }
        alt="drink"
        data-testid={ `${idx}-card-img` }
      />
    </div>
  );
}

Card.propTypes = {
  param: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

export default Card;
