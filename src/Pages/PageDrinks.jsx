import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';

export default function PageDrinks() {
  const { setTitle, setIconSearch } = useContext(context);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname === '/drinks') {
      setTitle('Drinks');
      setIconSearch(true);
    }
  }, [pathname, setIconSearch, setTitle]);

  return (
    <div>
      <Header />
      <Footer />
    </div>

  );
}
