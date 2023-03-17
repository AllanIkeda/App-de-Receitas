import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipesDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import './App.css';
// g
function App() {
  return (
    <Switch>
      <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/meals/:id" component={ RecipesDetails } />
      <Route path="/drinks/:id" component={ RecipesDetails } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/meals" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
