import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

export default function PageMeals() {
  const { setTitle, setIconSearch, foods,
  } = useContext(context);
  const [arrFoods, setArrFoods] = useState([]);

  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  useEffect(() => {
    if (pathname === '/meals') {
      setTitle('Meals');
      setIconSearch(true);
    }
    setArrFoods(foods);
  }, [foods, pathname, setIconSearch, setTitle]);

  const TWELVE = 12;
  // const arrFood = [];

  // foods.forEach((food, index) => {
  //   if (index < Twelve) {
  //     arrFood.push(food);
  //   }
  // });

  return (
    <div>
      <Header />
      <Recipes />
      <Footer />
      <section>
        {arrFoods.filter((_, i) => i < TWELVE).map((e, index) => (
          <div key={ e.idMeal } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{e.strMeal}</p>
            <img
              alt={ e.strMeal }
              src={ e.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </section>
    </div>
  );
}
