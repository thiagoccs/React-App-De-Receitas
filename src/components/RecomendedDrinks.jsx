import React, { useContext } from 'react';
import context from '../context/context';

function RecommendedMeals() {
  const { drink } = useContext(context);
  const SIX = 6;

  return (
    <div>
      <h1>Receitas Recomendadas</h1>
      {
        drink.filter((_, index) => index < SIX)
          .map((drinks, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <h1
                data-testid={ `${index}-recommendation-title` }
              >
                { drinks.strDrink }

              </h1>
              <img
                alt={ drinks.strDrink }
                src={ drinks.strDrinkThumb }
              />
            </div>
          ))
      }
    </div>
  );
}

export default RecommendedMeals;
