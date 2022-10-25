<<<<<<< HEAD
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
=======
import React from 'react';
import Footer from '../components/Footer';
>>>>>>> a0dd11e87819bf60bebee29ec741074b05c98ef1

export default function PageMeals() {
  const { setTitle, setIconSearch } = useContext(context);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (pathname === '/meals') {
      setTitle('Meals');
      setIconSearch(true);
    }
  }, [pathname, setIconSearch, setTitle]);

  return (
<<<<<<< HEAD
    <div>
      <Header />
    </div>
=======
    <>
      <div>PageMeals</div>
      <Footer />
    </>
>>>>>>> a0dd11e87819bf60bebee29ec741074b05c98ef1
  );
}
