import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import context from '../context/context';

export default function PageDrinks() {
  const { setTitle, setIconSearch, drink } = useContext(context);
  const [arrDrinks, setArrDrinks] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname === '/drinks') {
      setTitle('Drinks');
      setIconSearch(true);
    }
    if (drink === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      setArrDrinks(drink);
    }
    if (arrDrinks.length === 1) {
      history.push(`/drinks/${arrDrinks[0].idDrink}`);
    }
  }, [arrDrinks, arrDrinks.length, drink, history, pathname, setIconSearch, setTitle]);

  const TWELVE = 12;

  return (
    <div>
      <Header />
      <Footer />
      <Recipes />
      <section>
        {arrDrinks.filter((_, i) => i < TWELVE).map((e, index) => (
          <div key={ e.idDrink } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{e.strDrink}</p>
            <img
              alt={ e.strDrink }
              src={ e.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </section>
    </div>
  );
}
