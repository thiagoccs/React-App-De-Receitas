import React, { useContext } from 'react';
import context from '../context/context';

function RecommendedMeals() {
  const { drink } = useContext(context);
  const SIX = 6;

  return (
    <div className="items">
      {
        drink.filter((_, index) => index < SIX)
          .map((drinks, index) => (
            <div
              className="item"
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >

              <img
                className="img-carr"
                alt={ drinks.strDrink }
                src={ drinks.strDrinkThumb }
              />
              <p
                data-testid={ `${index}-recommendation-title` }
              >
                { drinks.strDrink }

              </p>
            </div>
          ))
      }
    </div>
  );
}

export default RecommendedMeals;
