import { useState, useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import context from '../context/context';
import fetchAPI from '../services/fetchApi';
import '../index.css';

function RecipeInProgress() {
  const { mealsDetailsState,
    setMealsDetailsState,
    drinksDetailsState,
    setDrinksDetailsState } = useContext(context);
  const [isChecked, setIsChecked] = useState([false, false, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false]);
  const { id } = useParams();
  const { pathname } = useLocation();

  const handleOnChange = (position) => {
    const updatedCheckedState = isChecked
      .map((item, index) => (index === position ? !item : item));
    setIsChecked(updatedCheckedState);
    const setStorage = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(updatedCheckedState));
    };
    setStorage();
  };

  useEffect(() => {
    const getStorage = () => {
      setIsChecked(JSON.parse(localStorage.getItem('inProgressRecipes')));
    };
    getStorage();
  }, []);

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
            <button type="button" data-testid="share-btn">Compartilhar</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
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
                            handleOnChange(index);
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
            <button type="button" data-testid="share-btn">Compartilhar</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
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
                          onChange={ () => handleOnChange(index) }
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
    </section>
  );
}

export default RecipeInProgress;
