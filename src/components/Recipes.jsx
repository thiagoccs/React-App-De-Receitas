import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';
import { fetchAPI } from '../services/fetchApi';

export default function Recipes() {
  const { categoriasDrink, categoriasFood, setDisableImg } = useContext(context);
  const [getFoods, setGetFoods] = useState([]);
  const [getDrinks, setGetDrinks] = useState([]);
  const [setClearButton] = useState(false);

  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const five = 5;
  const twelve = 12;

  const handleClickMeals = async ({ target }) => {
    const btnMeals = await fetchAPI('themealdb', 'filter.php?c', target.value);
    setGetFoods(btnMeals);
    setClearButton(true);
    if (getFoods !== []) {
      setDisableImg(false);
    }
  };
  const handleClickDrinks = async ({ target }) => {
    const btnDrinks = await fetchAPI(
      'thecocktaildb',
      'filter.php?c',
      target.value,
    );
    setGetDrinks(btnDrinks);
    setClearButton(true);
    if (getFoods !== []) {
      setDisableImg(false);
    }
  };

  const handleClear = () => {
    setGetFoods([]);
    setGetDrinks([]);
    setClearButton(false);
    setDisableImg(true);
  };

  return (
    <div>
      <section>
        {pathname === '/meals'
          && categoriasFood
            .filter((_, i) => i < five)
            .map((food, index) => (
              <button
                value={ food.strCategory }
                type="button"
                key={ index }
                data-testid={ `${food.strCategory}-category-filter` }
                onClick={ handleClickMeals }
              >
                {food.strCategory}
              </button>
            ))}
      </section>
      <section>
        {pathname === '/drinks'
          && categoriasDrink
            .filter((_, i) => i < five)
            .map((drink, index) => (
              <button
                value={ drink.strCategory }
                type="button"
                key={ index }
                data-testid={ `${drink.strCategory}-category-filter` }
                onClick={ handleClickDrinks }
              >
                {drink.strCategory}
              </button>
            ))}
      </section>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClear }
      >
        All
      </button>
      <section>
        {getFoods.meals
          && getFoods.meals
            .filter((e, i) => i < twelve)
            .map((e, index) => (
              <div key={ e.idMeal } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{e.strMeal}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ e.strMealThumb }
                  alt={ e.strMeal }
                />
              </div>
            ))}
      </section>
      <section>
        {getDrinks.drinks
          && getDrinks.drinks
            .filter((e, i) => i < twelve)
            .map((e, index) => (
              <div key={ e.idDrink } data-testid={ `${index}-recipe-card` }>
                <p data-testid={ `${index}-card-name` }>{e.strDrink}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ e.strDrinkThumb }
                  alt={ e.strDrink }
                />
              </div>
            ))}
      </section>
    </div>
  );
}
