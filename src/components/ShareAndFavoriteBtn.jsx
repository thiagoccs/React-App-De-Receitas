import React, { useState, useContext } from 'react';
import copy from 'clipboard-copy';
import { useParams, useHistory } from 'react-router-dom';
import context from '../context/context';

function ShareAndFavoriteBtn() {
  const { mealsDetailsState, drinksDetailsState } = useContext(context);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  function handleClickShare(type, param) {
    setIsLinkCopied(true);
    copy(`http://localhost:3000/${type}/${param}`);
  }

  const localStorageInfo = () => {
    if (pathname.includes('meals')) {
      const dataMeals = mealsDetailsState.meals
        .map((meal) => ({
          id: meal.idMeal,
          type: 'meal',
          nationality: meal.strArea,
          category: meal.strCategory,
          alcoholicOrNot: '',
          name: meal.strMeal,
          image: meal.strMealThumb,
        }));
      console.log(dataMeals);
      localStorage.setItem('favoriteRecipes', JSON.stringify(dataMeals));
    }
    if (pathname.includes('drinks')) {
      const dataDrinks = drinksDetailsState.drinks
        .map((drink) => ({
          id: drink.idDrink,
          type: 'drink',
          nationality: drink.strArea || '',
          category: drink.strCategory,
          alcoholicOrNot: drink.strAlcoholic || '',
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        }));
      localStorage.setItem('favoriteRecipes', JSON.stringify(dataDrinks));
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ pathname.includes('meals')
          ? () => handleClickShare('meals', id)
          : () => handleClickShare('drinks', id) }
      >
        Share
      </button>
      <br />
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ localStorageInfo }
      >
        Favorite
      </button>

      {isLinkCopied && <p>Link copied!</p>}

    </div>
  );
}

export default ShareAndFavoriteBtn;
