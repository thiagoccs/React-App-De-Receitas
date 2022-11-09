import { useState, useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import context from '../context/context';
import fetchAPI from '../services/fetchApi';
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
  const [isDisabled, setIsDisabled] = useState(false);
  const [favoriteHeart, setFavoriteHeart] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const handleOnChange = (position, snack, type) => {
    const updatedCheckedState = isChecked
      .map((item, index) => (index === position ? !item : item));
    setIsChecked(updatedCheckedState);
    const snackArray = pathname.includes('meals')
      ? mealsDetailsState : drinksDetailsState;
    const disabled = Array(snackArray).map((feed) => Object
      .keys(feed).filter((item) => item.includes('strIngredient'))
      .filter((key) => feed[key] !== null && feed[key] !== ''));
    const arrCheck = updatedCheckedState.filter((item) => item === true);
    const verify = disabled[0].length !== arrCheck.length;
    setIsDisabled(verify);
    const setStorage = () => {
      const item = { ...JSON.parse(localStorage
        .getItem('inProgressRecipes')),
      [snack]: { id: snack,
        type,
        checks: updatedCheckedState,
        done: disabled[0].length !== arrCheck.length } };
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
          const foodsDone = typeMeals[0].filter((item) => item.id === id)
            .map(({ done }) => done);
          setIsChecked(foods[0]);
          setIsDisabled(foodsDone[0]);
        }
        if (pathname.includes('drinks')) {
          const drinks = typeDrinks[0].filter((item) => item.id === id)
            .map(({ checks }) => checks);
          const drinksDone = typeDrinks[0].filter((item) => item.id === id)
            .map(({ done }) => done);
          setIsChecked(drinks[0]);
          setIsDisabled(drinksDone[0]);
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

  const handleClickFinishRecipe = (snack) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const storage = JSON.parse(localStorage
      .getItem('doneRecipes'));
    const feed = storage === null ? [] : storage;
    const item = [...feed, {
      id,
      name: pathname.includes('meals') ? snack.strMeal : snack.strDrink,
      type: pathname.includes('meals') ? 'meal' : 'drink',
      nationality: pathname.includes('meals') ? snack.strArea : '',
      category: snack.strCategory,
      tags: snack.strTags !== null ? snack.strTags.split(',') : [],
      doneDate: today.toISOString(),
      image: pathname.includes('meals') ? snack.strMealThumb : snack.strDrinkThumb,
      alcoholicOrNot: pathname.includes('meals') ? '' : snack.strAlcoholic,
    }];
    localStorage
      .setItem('doneRecipes', JSON
        .stringify(item));
    history.push('/done-recipes');
  };

  return (
    <section>
      {pathname.includes('meals') && (
        <RecipeInProgressMeal
          handleOnChange={ handleOnChange }
          handleClickShare={ () => handleClickShare('meals', id) }
          isChecked={ isChecked !== undefined
            ? isChecked : setIsChecked([false, false, false, false, false,
              false, false, false, false, false,
              false, false, false, false, false, false, false, false, false, false]) }
          mealsDetailsState={ mealsDetailsState }
          handleFavorite={ handleFavorite }
          isDisabled={ isDisabled }
          favoriteHeart={ favoriteHeart }
          id={ id }
          handleClickFinishRecipe={ handleClickFinishRecipe }
        />
      )}
      {pathname.includes('drinks') && (
        <RecipeInProgressDrink
          handleOnChange={ handleOnChange }
          handleClickShare={ () => handleClickShare('drinks', id) }
          isChecked={ isChecked !== undefined
            ? isChecked : setIsChecked([false, false, false, false, false,
              false, false, false, false, false,
              false, false, false, false, false, false, false, false, false, false]) }
          drinksDetailsState={ drinksDetailsState }
          handleFavorite={ handleFavorite }
          isDisabled={ isDisabled }
          favoriteHeart={ favoriteHeart }
          id={ id }
          handleClickFinishRecipe={ handleClickFinishRecipe }
        />
      )}
      {isLinkCopied && <LinkCopied />}
    </section>
  );
}
export default RecipeInProgress;
