import { useState, useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useLocation, useParams } from 'react-router-dom';
import context from '../context/context';
import fetchAPI from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../index.css';
import LinkCopied from '../components/LinkCopied';
import RecipeInProgressDrink from '../components/RecipeInProgressDrink';
import RecipeInProgressMeal from '../components/RecipeInProgressMeal';

function RecipeInProgress() {
  const { mealsDetailsState,
    setMealsDetailsState,
    drinksDetailsState,
    setDrinksDetailsState,
  } = useContext(context);
  const [isChecked, setIsChecked] = useState([false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const [favoriteHeart, setFavoriteHeart] = useState(false);

  const { id } = useParams();
  const { pathname } = useLocation();

  const handleOnChange = (position, snack, type) => {
    const updatedCheckedState = isChecked
      .map((item, index) => (index === position ? !item : item));
    setIsChecked(updatedCheckedState);

    const setStorage = () => {
      const item = { ...JSON.parse(localStorage
        .getItem('inProgressRecipes')),
      [snack]: { id: snack, type, checks: updatedCheckedState } };
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(item));
    };
    setStorage();
  };

  const setStorage = (snack) => {
    const storage = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    const isNull = storage === null ? [] : storage;
    const food = isNull
      .map(({ id: identity }) => identity === id) ? isNull
        .filter(({ id: identity }) => identity !== id) : isNull
        .filter(({ id: identity }) => identity === id);
    if (!isNull.some((value) => value.id === id)) {
      const item = [...food, {
        id,
        type: pathname.includes('meals') ? 'meal' : 'drink',
        category: snack.strCategory,
        alcoholicOrNot: pathname.includes('meals') ? '' : snack.strAlcoholic,
        name: pathname.includes('meals') ? snack.strMeal : snack.strDrink,
        image: pathname.includes('meals') ? snack.strMealThumb : snack.strDrinkThumb,
        nationality: pathname.includes('meals') ? snack.strArea : '',
      }];
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify(item));
    } else {
      const item = food.filter((e) => e.id !== id);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify(item));
    }
  };

  const handleFavorite = (snack) => {
    setFavoriteHeart((prevState) => !prevState);
    setStorage(snack);
  };
  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    if (favoriteStorage !== null && favoriteStorage.some((item) => item.id === id)) {
      setFavoriteHeart(true);
    }
  }, [id]);
  useEffect(() => {
    const getStorage = () => {
      if (localStorage.getItem('inProgressRecipes') !== null) {
        const ingredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
        const typeMeals = Array(ingredients)
          .map((item) => Object.values(item).filter(({ type }) => type === 'meals'));
        const typeDrinks = Array(ingredients)
          .map((item) => Object.values(item).filter(({ type }) => type === 'drinks'));

        if (pathname.includes('meals')) {
          const foods = typeMeals[0].filter((item) => item.id === id)
            .map(({ checks }) => checks);
          setIsChecked(foods[0]);
        }
        if (pathname.includes('drinks')) {
          const drinks = typeDrinks[0].filter((item) => item.id === id)
            .map(({ checks }) => checks);
          setIsChecked(drinks[0]);
        }
      }
    };

    getStorage();
  }, [id, pathname]);

  useEffect(() => {
    const fetchMealsDetails = async () => {
      const mealsDetails = await fetchAPI(
        'themealdb',
        'lookup.php?i',
        id,
      );
      setMealsDetailsState(mealsDetails.meals[0]);
    };
    const fetchDrinksDetails = async () => {
      const drinksDetails = await fetchAPI(
        'thecocktaildb',
        'lookup.php?i',
        id,
      );

      setDrinksDetailsState(drinksDetails.drinks[0]);
    };

    if (pathname.includes('meals')) {
      fetchMealsDetails();
    }
    if (pathname.includes('drinks')) {
      fetchDrinksDetails();
    }
  }, [id, pathname, setDrinksDetailsState, setMealsDetailsState]);

  function handleClickShare(type, snackId) {
    setIsLinkCopied(true);
    copy(`http://localhost:3000/${type}/${snackId}`);
  }

  return (
    <section>
      {pathname.includes('meals') && (

        <div>
          <h1 data-testid="recipe-title">{mealsDetailsState.strMeal}</h1>
          <img
            src={ mealsDetailsState.strMealThumb }
            alt={ mealsDetailsState.strMeal }
            data-testid="recipe-photo"
          />
          <div>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => handleClickShare('meals', id) }
            >
              <img src={ shareIcon } alt="share" />

            </button>
            <button type="button" onClick={ () => handleFavorite(mealsDetailsState) }>
              {' '}
              <img
                data-testid="favorite-btn"
                src={
                  favoriteHeart ? blackHeartIcon : whiteHeartIcon
                }
                alt="favorite"
              />
            </button>
          </div>
          <RecipeInProgressMeal
            handleOnChange={ handleOnChange }
            isChecked={ isChecked !== undefined
              ? isChecked : setIsChecked([false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false]) }
            mealsDetailsState={ mealsDetailsState }
          />
          <p data-testid="recipe-category">{mealsDetailsState.strCategory}</p>
          <div data-testid="instructions">{mealsDetailsState.strInstructions}</div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita

          </button>
        </div>
      )}
      {pathname.includes('drinks') && (
        <div>
          <h1 data-testid="recipe-title">{drinksDetailsState.strDrink}</h1>
          <img
            src={ drinksDetailsState.strDrinkThumb }
            alt={ drinksDetailsState.strDrink }
            data-testid="recipe-photo"
          />
          <div>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => handleClickShare('drinks', id) }
            >
              <img src={ shareIcon } alt="share" />

            </button>
            <button type="button" onClick={ () => handleFavorite(drinksDetailsState) }>
              {' '}
              <img
                data-testid="favorite-btn"
                src={ favoriteHeart ? blackHeartIcon : whiteHeartIcon }
                alt="favorite"
              />
            </button>
          </div>
          <RecipeInProgressDrink
            handleOnChange={ handleOnChange }
            isChecked={ isChecked !== undefined
              ? isChecked : setIsChecked([false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false]) }
            drinksDetailsState={ drinksDetailsState }
          />
          <p data-testid="recipe-category">
            {drinksDetailsState.strCategory}

          </p>
          <div data-testid="instructions">
            {drinksDetailsState.strInstructions}

          </div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita

          </button>
        </div>
      )}
      {isLinkCopied && <LinkCopied />}
    </section>
  );
}

export default RecipeInProgress;
