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

  return (
    <div>
      <section>
        {pathname === '/meals' && categoriasFood
          .filter((_, i) => i < five).map((food, index) => (
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
        {pathname === '/drinks' && categoriasDrink
          .filter((_, i) => i < five).map((drink, index) => (
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
