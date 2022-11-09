import React, { useState, useContext, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useLocation, useParams } from 'react-router-dom';
import context from '../context/context';
import LinkCopied from './LinkCopied';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import setFavoriteRecipes from '../func/setFavoriteRecipes';

function ShareAndFavoriteBtn() {
  const { mealsDetailsState,
    drinksDetailsState } = useContext(context);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [favoriteHeart, setFavoriteHeart] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();

  function handleClickShare(type, param) {
    setIsLinkCopied(true);
    copy(`http://localhost:3000/${type}/${param}`);
  }

  const handleFavorite = (snack) => {
    setFavoriteHeart((prevState) => !prevState);
    console.log(snack);
    setFavoriteRecipes(snack, id, pathname);
  };
  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    if (favoriteStorage !== null && favoriteStorage.some((item) => item.id === id)) {
      setFavoriteHeart(true);
    }
  }, [id]);

  // useEffect(() => {
  //   const fetchMealsDetails = async () => {
  //     const mealsDetails = await fetchAPI(
  //       'themealdb',
  //       'lookup.php?i',
  //       id,
  //     );
  //     setMealsDetailsState(mealsDetails.meals[0]);
  //   };
  //   const fetchDrinksDetails = async () => {
  //     const drinksDetails = await fetchAPI(
  //       'thecocktaildb',
  //       'lookup.php?i',
  //       id,
  //     );
  //     setDrinksDetailsState(drinksDetails.drinks[0]);
  //   };
  //   if (pathname.includes('meals')) {
  //     fetchMealsDetails();
  //   }
  //   if (pathname.includes('drinks')) {
  //     fetchDrinksDetails();
  //   }
  // }, [id, pathname]);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ pathname.includes('meals')
          ? () => handleClickShare('meals', id)
          : () => handleClickShare('drinks', id) }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <br />
      <button
        type="button"
        onClick={ () => (pathname
          .includes('meals') ? handleFavorite(mealsDetailsState.meals[0])
          : handleFavorite(drinksDetailsState.drinks[0])) }
      >
        {' '}
        <img
          data-testid="favorite-btn"
          src={
            favoriteHeart ? blackHeartIcon : whiteHeartIcon
          }
          alt="favorite"
        />
      </button>

      {isLinkCopied && <LinkCopied />}

    </div>
  );
}

export default ShareAndFavoriteBtn;
