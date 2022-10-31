import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';

export default function Profile() {
  const { setTitle, setIconSearch } = useContext(context);

  const [userProfile, setUserProfile] = useState('');

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    setUserProfile(getEmail);
    console.log(getEmail);
  }, []);

  useEffect(() => {
    if (pathname === '/profile') {
      setTitle('Profile');
      setIconSearch(false);
    }
  }, [pathname, setIconSearch, setTitle]);

  function handleClick({ target: { name } }) {
    switch (name) {
    case 'done-btn':
      return history.push('/done-recipes');
    case 'favorite-btn':
      return history.push('/favorite-recipes');
    default:
      localStorage.clear();
      history.push('/');
      break;
    }
  }

  return (
    <div>
      <Header />
      {userProfile && <h4 data-testid="profile-email">{userProfile.email}</h4>}
      <button
        type="button"
        data-testid="profile-done-btn"
        name="done-btn"
        onClick={ handleClick }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        name="favorite-btn"
        onClick={ handleClick }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        name="profiel-btn"
        onClick={ handleClick }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
