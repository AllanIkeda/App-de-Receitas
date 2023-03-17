import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/footer.css';

function Footer() {
  const history = useHistory();
  const clickDrinks = () => {
    history.push('/drinks');
  };
  const clickMeals = () => {
    history.push('/meals');
  };

  return (
    <div
      data-testid="footer"
      className="footer h-20 w-screen fixed bottom-0
      bg-violet-900 flex items-center justify-between px-8"
    >
      <button type="button" className="button" onClick={ () => clickDrinks() }>
        <img
          className="w-10"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drinks"
        />
      </button>
      <button type="button" className="button" onClick={ () => clickMeals() }>
        <img
          className="w-14"
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="Meals"
        />
      </button>
    </div>
  );
}

export default Footer;
