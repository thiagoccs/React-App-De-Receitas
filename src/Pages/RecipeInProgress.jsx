import { useState, useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useLocation, useParams } from 'react-router-dom';
import context from '../context/context';
import fetchAPI from '../services/fetchApi';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../index.css';

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

  const handleFavorite = (snack) => {
    setFavoriteHeart((prevState) => !prevState);
    const setStorage = () => {
      const storage = JSON.parse(localStorage
        .getItem('favoriteRecipes'));

      const food = storage === null ? [] : storage;
      const item = [...food, {
        id: pathname.includes('meals') ? snack.idMeal : snack.idDrink,
        type: pathname.includes('meals') ? 'meal' : 'drink',
        nationality: snack.strArea,
        category: snack.strCategory,
        alcoholicOrNot: pathname.includes('meals') ? '' : snack.strAlcoholic,
        name: pathname.includes('meals') ? snack.strMeal : snack.strDrink,
        image: pathname.includes('meals') ? snack.strMealThumb : snack.strDrinkThumb,
      }];
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify(item));
    };
    if (pathname.includes('meals')) {
      setStorage();
    }
  };

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
  }, [id, isChecked, mealsDetailsState,
    pathname, setDrinksDetailsState, setMealsDetailsState]);

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
                src={ favoriteHeart ? blackHeartIcon : whiteHeartIcon }
                alt="favorite"
              />
            </button>
          </div>
          {
            [mealsDetailsState].map((meal) => Object
              .keys(meal).filter((item) => item.includes('strIngredient'))
              .map((key, index) => (
                (
                  meal[key] !== null && meal[key] !== ''
                    && (
                      <label
                        className={ isChecked[index] ? 'checked' : undefined }
                        data-testid={ `${index}-ingredient-step` }
                        htmlFor="Ingredient"
                        key={ meal[key] }
                      >
                        <input
                          checked={ isChecked[index] }
                          onChange={ () => {
                            handleOnChange(index, meal.idMeal, 'meals');
                          } }
                          type="checkbox"
                          name="Ingredient"
                          value={ meal[key] }
                        />
                        { meal[key] }
                      </label>
                    )
                )
              )))
          }
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
            <button type="button" onClick={ handleFavorite }>
              {' '}
              <img
                data-testid="favorite-btn"
                src={ favoriteHeart ? blackHeartIcon : whiteHeartIcon }
                alt="favorite"
              />
            </button>
          </div>
          {
            [drinksDetailsState].map((drink) => Object
              .keys(drink).filter((item) => item.includes('strIngredient'))
              .map((key, index) => (
                (
                  drink[key] !== null && drink[key] !== ''
                    && (
                      <label
                        className={ isChecked[index] ? 'checked' : undefined }
                        data-testid={ `${index}-ingredient-step` }
                        htmlFor="Ingredient"
                        key={ drink[key] }
                      >
                        <input
                          checked={ isChecked[index] }
                          onChange={ () => handleOnChange(
                            index,
                            drink.idDrink,
                            'drinks',
                          ) }
                          type="checkbox"
                          name="Ingredient"
                          value={ drink[key] }
                        />
                        { drink[key] }
                      </label>
                    )
                )
              )))
          }
          <p data-testid="recipe-category">{drinksDetailsState.strCategory}</p>
          <div data-testid="instructions">{drinksDetailsState.strInstructions}</div>
          <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
        </div>
      )}
      {isLinkCopied && <p>Link copied!</p>}
    </section>
  );
}

export default RecipeInProgress;
