import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';

export default function Favorites() {
  const { setTitle, setIconSearch } = useContext(context);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname === '/favorite-recipes') {
      setTitle('Favorite Recipes');
      setIconSearch(false);
    }
  }, [pathname, setIconSearch, setTitle]);

  return (
    <div>
      <Header />
    </div>
  );
}
