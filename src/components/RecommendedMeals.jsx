import React, { useContext } from 'react';
import context from '../context/context';
import './recommended.css';

function RecommendedMeals() {
  const { foods } = useContext(context);

  const SIX = 6;

  return (
    <div className="divpai">
      <div className="items">
        {
          foods.filter((_, index) => index < SIX)
            .map((food, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recommendation-card` }
                className="item"
              >

                <img
                  className="img-carr"
                  alt={ food.strMeal }
                  src={ food.strMealThumb }
                />
                <p
                  data-testid={ `${index}-recommendation-title` }
                >
                  { food.strMeal }

                </p>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default RecommendedMeals;
