import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import context from '../context/context';

export default function PageDrinks() {
  const { setTitle, setIconSearch, drink } = useContext(context);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname === '/drinks') {
      setTitle('Drinks');
      setIconSearch(true);
    }
  }, [pathname, setIconSearch, setTitle]);

  const twelve = 12;
  const arrDrink = [];
  drink.forEach((drinks, index) => {
    if (index < twelve) {
      arrDrink.push(drinks);
    }
  });

  return (
    <div>
      <Header />
      <Footer />
      <Recipes />
      <ul>
        {arrDrink.map((e, index) => (
          <li key={ e.idDrink } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{e.strDrink}</p>
            <img
              alt={ e.strDrink }
              src={ e.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
