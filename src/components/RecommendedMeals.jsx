import React, { useContext } from 'react';
import context from '../context/context';
import '../Pages/style.css';

function RecommendedMeals() {
  const { foods } = useContext(context);

  console.log(foods);
  const SIX = 6;

  return (
    <div>
      <h1>Receitas Recomendadas</h1>
      {
        foods.filter((_, index) => index < SIX)
          .map((food, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              className="horizontal-scroll"
            >
              <h1
                data-testid={ `${index}-recommendation-title` }
              >
                { food.strMeal }

              </h1>
              <img
                alt={ food.strMeal }
                src={ food.strMealThumb }
              />
            </div>
          ))
      }
    </div>
  );
}

export default RecommendedMeals;
