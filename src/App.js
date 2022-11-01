import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Pages/Login';
import PageMeals from './Pages/PageMeals';
import PageDrinks from './Pages/PageDrinks';
import InProgress from './Pages/InProgress';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ PageMeals } />
      <Route exact path="/drinks" component={ PageDrinks } />
      <Route exact path="/meals/:id-da-receita" component={ PageMeals } />
      <Route exact path="/drinks/:id-da-receita" component={ PageDrinks } />
      <Route exact path="/meals/:id-da-receita/in-progress" component={ InProgress } />
      <Route exact path="/drinks/:id-da-receita/in-progress" component={ InProgress } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
      <Route exact path="/Details" component={ RecipeDetails } />

    </div>
  );
}

export default App;
