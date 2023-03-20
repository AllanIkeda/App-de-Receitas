import React from 'react';
import PropTypes from 'prop-types';

function Card({ param, idx }) {
  return (
    <div
      className="card-container"
      data-testid={ `${idx}-recipe-card` }
    >
      <div
        className="card-container-title"
      >
        <h2
          className="card-title "
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
