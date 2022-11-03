import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';
import fetchAPI from '../services/fetchApi';

export default function Recipes() {
  const { categoriasDrink, categoriasFood } = useContext(context);
  const [getFoods, setGetFoods] = useState([]);
  const [getDrinks, setGetDrinks] = useState([]);
  const [clearButton, setClearButton] = useState(false);

  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const five = 5;
  const twelve = 12;

  const handleClickMeals = async ({ target }) => {
    history.push('/Details');
    const btnMeals = await fetchAPI('themealdb', 'filter.php?c', target.value);
    setGetFoods(btnMeals);
    setClearButton(true);
  };
  const handleClickDrinks = async ({ target }) => {
    history.push('/Details');
    const btnDrinks = await fetchAPI(
      'thecocktaildb',
      'filter.php?c',
      target.value,
    );
    setGetDrinks(btnDrinks);
    setClearButton(true);
  };

  const handleClear = () => {
    setGetFoods([]);
    setGetDrinks([]);
    setClearButton(false);
  };
  console.log(getDrinks);

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
      {clearButton
      && (
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleClear }
        >
          All
        </button>) }
      <section>
        {getFoods.meals
          && getFoods.meals
            .filter((e, i) => i < twelve)
            .map((e) => (
              <div key={ e.idMeal }>
                <p>{e.strMeal}</p>
                <img alt={ e.strMeal } src={ e.strMealThumb } />
              </div>
            ))}
      </section>
      <section>
        {getDrinks.drinks
          && getDrinks.drinks
            .filter((e, i) => i < twelve)
            .map((e) => (
              <div key={ e.idDrink }>
                <p>{e.strMeal}</p>
                <img alt={ e.strDrink } src={ e.strDrinkThumb } />
              </div>
            ))}
      </section>
    </div>
  );
}
