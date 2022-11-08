import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Pages/Login';
import PageMeals from './Pages/PageMeals';
import PageDrinks from './Pages/PageDrinks';
import RecipeInProgress from './Pages/RecipeInProgress';
import Favorites from './Pages/FavoriteRecipes';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ PageMeals } />
      <Route exact path="/drinks" component={ PageDrinks } />
      <Route
        exact
        path="/meals/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="in-progress" component={ RecipeInProgress } />
    </div>
  );
}

export default App;
