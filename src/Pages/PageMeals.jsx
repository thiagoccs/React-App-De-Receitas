import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
// import { fetchAPI } from '../services/fetchApi';

export default function PageMeals() {
  const { setTitle, setIconSearch, foods, disableImg } = useContext(context);
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
    if (foods === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setArrFoods(foods);
    }
    if (arrFoods.length === 1) {
      history.push(`/meals/${arrFoods[0].idMeal}`);
    }
  }, [arrFoods, foods, history, pathname, setIconSearch, setTitle]);

  const TWELVE = 12;

  return (
    <div>
      <Header />
      <Recipes />
      <Footer />
      <section>
        {disableImg
          && arrFoods
            .filter((_, i) => i < TWELVE)
            .map((e, index) => (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ e.idMeal }
              >
                <p
                  value={ e.idMeal }
                  data-testid={ `${index}-card-name` }
                >
                  {e.strMeal}

                </p>
                <Link to={ `meals/${e.idMeal}` }>
                  <img
                    alt={ e.strMeal }
                    src={ e.strMealThumb }
                    data-testid={ `${index}-card-img` }
                  />
                </Link>

              </div>
            ))}
      </section>
    </div>
  );
}
