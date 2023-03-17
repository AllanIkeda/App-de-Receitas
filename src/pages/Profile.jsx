import React from 'react';
import { useHistory } from 'react-router';
import '../App.css';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import doneIcon from '../images/doneIcon.svg';
import likeIcon from '../images/likeIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const history = useHistory();
  const { email } = user;
  return (
    <div>
      <Header />
      <div className="flex h-full flex-col mt-10 items-center justify-evenly">
        <h3
          className="text-2xl mb-10 font-bold"
          data-testid="profile-email"
        >
          { email }
        </h3>
        <div className="flex flex-col justify-evenly h-full">
          <button
            className="text-2xl items-center mt-20 h-full flex"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            <img className="mr-6 w-16" src={ doneIcon } alt="done" />
            Done Recipes
          </button>
          <button
            className="text-2xl items-center mt-20 h-full flex"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            <img className="mr-6 w-16" src={ likeIcon } alt="done" />
            Favorite Recipes
          </button>
          <button
            className="text-2xl items-center mt-20 h-full flex text-red-500"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear('user');
              localStorage.clear('doneRecipes');
              localStorage.clear('favoriteRecipes');
              localStorage.clear('inProgressRecipes');
              history.push('/');
            } }
          >
            <img className="mr-6 w-16" src={ logoutIcon } alt="done" />
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
