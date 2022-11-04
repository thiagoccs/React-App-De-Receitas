import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import fetchAPI from '../services/fetchApi';

function RecipeInProgress() {
  const [mealsDetailsState, setMealsDetailsState] = useState([]);
  const [drinksDetailsState, setDrinksDetailsState] = useState([]);

  const { id } = useParams();
  const { pathname } = useLocation();

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
  }, [id, pathname]);

  return (
    <section>
      {pathname.includes('meals') && (

        <div key="teste">
          <h1 data-testid="recipe-title">{mealsDetailsState.strMeal}</h1>
          <img
            src={ mealsDetailsState.strMealThumb }
            alt={ mealsDetailsState.strMeal }
            data-testid="recipe-photo"
          />
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
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
          <button type="button" data-testid="share-btn">Compartilhar</button>
          <button type="button" data-testid="favorite-btn">Favoritar</button>
          <p data-testid="recipe-category">{drinksDetailsState.strCategory}</p>
          <div data-testid="instructions">{drinksDetailsState.strInstructions}</div>
          <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
        </div>
      )}
    </section>
  );
}

export default RecipeInProgress;
