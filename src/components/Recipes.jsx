import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';

export default function Recipes() {
  const { categoriasDrink, categoriasFood } = useContext(context);

  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const five = 5;
  const arrCategoriaDrink = [];
  categoriasDrink.forEach((food, index) => {
    if (index < five) {
      arrCategoriaDrink.push(food);
    }
  });
  const arrCategoriaFood = [];
  categoriasFood.forEach((food, index) => {
    if (index < five) {
      arrCategoriaFood.push(food);
    }
  });
  return (
    <div>
      <section>
        {pathname === '/meals' && arrCategoriaFood.map((food, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${food.strCategory}-category-filter` }
          >
            {food.strCategory}
          </button>
        ))}
      </section>
      <section>
        {pathname === '/drinks' && arrCategoriaDrink.map((drink, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${drink.strCategory}-category-filter` }
          >
            {drink.strCategory}
          </button>
        ))}
      </section>
    </div>
  );
}
