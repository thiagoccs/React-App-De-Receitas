import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function PageMeals() {
  const { setTitle, setIconSearch, foods } = useContext(context);

  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  useEffect(() => {
    if (pathname === '/meals') {
      setTitle('Meals');
      setIconSearch(true);
    }
  }, [pathname, setIconSearch, setTitle]);

  const Twelve = 12;
  const arrFood = [];
  foods.forEach((food, index) => {
    if (index < Twelve) {
      arrFood.push(food);
    }
  });
  return (
    <div>
      <Header />
      <Recipes />
      <Footer />
      <ul>
        {arrFood.map((e, index) => (
          <li key={ e.idMeal } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{e.strMeal}</p>
            <img
              alt={ e.strMeal }
              src={ e.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
