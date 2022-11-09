import { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn() {
  const [favoriteHeart, setFavoriteHeart] = useState(false);

  const handleFavorite = () => {
    setFavoriteHeart((prevState) => !prevState);
  };
  return (
    <button type="button" onClick={ handleFavorite }>
      {' '}
      <img
        data-testid="favorite-btn"
        src={ favoriteHeart ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
      />
    </button>
  );
}

export default FavoriteBtn;
